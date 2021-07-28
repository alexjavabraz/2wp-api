import {repository} from '@loopback/repository';
import {post, getModelSchemaRef, requestBody, response} from '@loopback/rest';
import {NormalizedTx, SignedTxRequest, SignedTxResponse} from '../models';
import {SessionRepository} from '../repositories';
import * as bitcoin from 'bitcoinjs-lib';
import * as constants from '../constants';
import {Signer} from 'bitcoinjs-lib';

export class SignedTxController {
  private NETWORK: bitcoin.Network;
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) {
    this.NETWORK =
      process.env.NETWORK === constants.BTC_NETWORK_MAINNET
        ? bitcoin.networks.bitcoin
        : bitcoin.networks.testnet;
  }

  @post('/signed-tx')
  @response(200, {
    description: 'SignedTx built from signatures',
    content: {
      'application/json': {schema: getModelSchemaRef(SignedTxResponse)},
    },
  })
  async getSignedTx(
    @requestBody({schema: getModelSchemaRef(SignedTxRequest)})
    req: SignedTxRequest,
  ): Promise<SignedTxResponse> {
    return new Promise<SignedTxResponse>((resolve, reject) => {
      const psbt = new bitcoin.Psbt({network: this.NETWORK});
      this.sessionRepository
        .getNormalizedTx(req.sessionId)
        .then((normalizedTx: NormalizedTx) => {
          normalizedTx.inputs.forEach(input => {
            const utxo = bitcoin.Transaction.fromHex(input.prev_hash);
            const addressItem = req.addressList.find(
              ({address}) => input.address === address,
            );
            if (addressItem) {
              const redeemScript = this.getRedeem(addressItem.publicKey);
              psbt.addInput({
                hash: utxo.getHash(),
                index: input.prev_index,
                nonWitnessUtxo: utxo.toBuffer(),
                redeemScript,
              });
            } else {
              reject(new Error('There is no public key provided'));
            }
          });
          normalizedTx.outputs.forEach(output => {
            if (output.op_return_data) {
              const buffer = Buffer.from(output.op_return_data, 'hex');
              const script: bitcoin.Payment = bitcoin.payments.embed({
                data: [buffer],
              });
              if (script.output) {
                psbt.addOutput({
                  script: script.output,
                  value: 0,
                });
              }
            } else if (output.address) {
              psbt.addOutput({
                address: output.address,
                value: Number(output.amount),
              });
            }
          });
          psbt.setVersion(2);
          return req.signatures.map((signature, index) => {
            const input = normalizedTx.inputs[index];
            const addressItem = req.addressList.find(
              ({address}) => input.address === address,
            );
            if (addressItem)
              return psbt.signInput(
                index,
                this.generateSigner(signature, addressItem.publicKey),
              );
            else reject(new Error('There is no public key provided'));
          });
        })
        .then(() => psbt.validateSignaturesOfAllInputs())
        .then(isValidTx => {
          if (!isValidTx) reject(new Error('Invalid Transaction.'));
          psbt.finalizeAllInputs();
          const signedTx = psbt.extractTransaction().toHex();
          resolve(new SignedTxResponse({signedTx}));
        })
        .catch(reject);
    });
  }

  private getRedeem(pubKey: string) {
    const {publicKey} = bitcoin.ECPair.fromPublicKey(
      Buffer.from(pubKey, 'hex'),
    );
    const pk = publicKey.toString('hex');
    const pair = bitcoin.ECPair.fromPublicKey(Buffer.from(pk, 'hex'));
    const p2wpkh = bitcoin.payments.p2wpkh({
      pubkey: pair.publicKey,
      network: this.NETWORK,
    });
    const p2sh = bitcoin.payments.p2sh({redeem: p2wpkh, network: this.NETWORK});
    return p2sh.redeem?.output;
  }

  private generateSigner(signature: string, publicKey: string): Signer {
    const pair = bitcoin.ECPair.fromPublicKey(Buffer.from(publicKey, 'hex'));
    return {
      network: this.NETWORK,
      publicKey: pair.publicKey,
      sign: ($hash: Buffer) => {
        const encodedSignature = Buffer.from(signature, 'hex');
        const decoded = bitcoin.script.signature.decode(encodedSignature);
        return decoded.signature;
      },
    };
  }
}
