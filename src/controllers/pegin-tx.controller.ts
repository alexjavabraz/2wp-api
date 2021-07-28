import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {config} from 'dotenv';
import {splitTransaction} from '@ledgerhq/hw-app-btc/lib/splitTransaction';
import {serializeTransactionOutputs} from '@ledgerhq/hw-app-btc/lib/serializeTransaction';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import peginAddressVerifier from 'pegin-address-verificator';
import {CreatePeginTxData, NormalizedTx, TxInput, TxOutput} from '../models';
import {SessionRepository} from '../repositories';
import {BridgeService, TxService} from '../services';
import {Transaction} from '@ledgerhq/hw-app-btc/lib/types';
import {inject} from '@loopback/core';
import * as bitcoin from 'bitcoinjs-lib';
import * as constants from '../constants';

config();

export class PeginTxController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
    @inject('services.TxService')
    protected txService: TxService,
  ) {}

  @post('/pegin-tx')
  @response(201, {
    description: 'Creates a normalized transaction based on the data provided',
    content: {
      'application/json': {schema: getModelSchemaRef(CreatePeginTxData)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreatePeginTxData),
        },
      },
    })
    createPeginTxData: CreatePeginTxData,
  ): Promise<NormalizedTx> {
    return new Promise<NormalizedTx>((resolve, reject) => {
      const outputs: TxOutput[] = [];
      const network = process.env.NETWORK ?? 'testnet';
      const bridgeService = new BridgeService(
        process.env.BRIDGE_ADDRESS ??
          '0x0000000000000000000000000000000001000006',
      );
      const addressInfo = peginAddressVerifier.getAddressInformation(
        createPeginTxData.refundAddress,
      );
      const validAddress = addressInfo
        ? peginAddressVerifier.canPegIn(addressInfo)
        : false;
      if (!validAddress)
        reject(
          `Invalid Refund Address provided ${createPeginTxData.refundAddress} for network ${network}`,
        );
      Promise.all([
        this.sessionRepository.getAccountInputs(createPeginTxData.sessionId),
        this.sessionRepository.getFeeLevel(
          createPeginTxData.sessionId,
          createPeginTxData.feeLevel,
        ),
        bridgeService.getFederationAddress(),
      ])
        .then(([inputs, fee, federationAddress]) => {
          outputs.push(
            this.getRSKOutput(
              createPeginTxData.recipient,
              createPeginTxData.refundAddress,
            ),
          );
          outputs.push(
            this.getFederationOutput(
              createPeginTxData.amountToTransferInSatoshi,
              federationAddress,
            ),
          );
          outputs.push(
            this.getChangeOutput(
              inputs,
              createPeginTxData.changeAddress,
              createPeginTxData.amountToTransferInSatoshi,
              fee,
            ),
          );
          return Promise.all([inputs, this.getLedgerInputs(inputs)]);
        })
        .then(([inputs, ledgerInputs]) => {
          const outputScriptHex: Buffer = this.getOutputScriptHex(outputs);
          const normalizedTx = new NormalizedTx({
            inputs,
            outputs,
            ledgerInputs,
            outputScriptHex,
          });
          return Promise.all([
            normalizedTx,
            this.sessionRepository.setNormalizedTx(
              createPeginTxData.sessionId,
              normalizedTx,
            ),
          ]);
        })
        .then(([normalizedTx]) => {
          resolve(normalizedTx);
        })
        .catch(reject);
    });
  }

  getRSKOutput(recipient: string, refundAddress: string): TxOutput {
    const output: TxOutput = new TxOutput({
      amount: '0',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      script_type: 'PAYTOOPRETURN',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      op_return_data: '52534b5401',
    });
    output.op_return_data += recipient;
    const addressInfo =
      peginAddressVerifier.getAddressInformation(refundAddress);
    switch (addressInfo.type) {
      case 'p2pkh':
        output.op_return_data += `01${addressInfo.scriptPubKey}`;
        break;
      case 'p2sh':
        output.op_return_data += `02${addressInfo.scriptHash}`;
        break;
    }
    return output;
  }

  getFederationOutput(
    amountToTransferInSatoshi: number,
    federationAddress: string,
  ): TxOutput {
    return new TxOutput({
      amount: amountToTransferInSatoshi.toString(),
      address: federationAddress,
    });
  }

  private getChangeOutput(
    inputs: TxInput[],
    changeAddress: string,
    amountToTransferInSatoshi: number,
    fee: number,
  ): TxOutput {
    let capacity = 0;
    inputs.forEach(input => {
      capacity += input.amount ? +input.amount : 0;
    });
    const change = capacity - (amountToTransferInSatoshi + fee);
    return new TxOutput({
      amount: (change >= 0 ? change : 0).toFixed(0),
      address: changeAddress,
    });
  }

  private getLedgerInputs(inputs: TxInput[]): Promise<Transaction[]> {
    return new Promise<Transaction[]>((resolve, reject) => {
      const txPromises = inputs.map(input =>
        this.txService.txProvider(input.prev_hash),
      );
      Promise.all(txPromises)
        .then(txList => {
          const responseTxList: Transaction[] = txList.map(tx => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const [, , , , , , , , , , , , hex] = tx;
            const bitcoinTx = bitcoin.Transaction.fromHex(hex);
            return splitTransaction(hex, bitcoinTx.hasWitnesses());
          });
          resolve(responseTxList);
        })
        .catch(reject);
    });
  }

  private getOutputScriptHex(outputs: TxOutput[]) {
    const NETWORK =
      process.env.NETWORK === constants.BTC_NETWORK_MAINNET
        ? bitcoin.networks.bitcoin
        : bitcoin.networks.testnet;
    const txBuilder = new bitcoin.TransactionBuilder(NETWORK);
    outputs.forEach(output => {
      if (output.op_return_data) {
        const buffer = Buffer.from(output.op_return_data, 'hex');
        const script: bitcoin.Payment = bitcoin.payments.embed({
          data: [buffer],
        });
        if (script.output) {
          txBuilder.addOutput(script.output, 0);
        }
      } else if (output.address) {
        txBuilder.addOutput(output.address, Number(output.amount));
      }
    });
    const partialTx = txBuilder.buildIncomplete().toHex();
    return serializeTransactionOutputs(splitTransaction(partialTx));
  }
}
