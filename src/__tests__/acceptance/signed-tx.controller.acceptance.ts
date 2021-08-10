import {Client, expect} from '@loopback/testlab';
import {TwpapiApplication} from '../..';
import {setupApplication} from './test-helper';
import {baseState2, testCase1} from '../fixtures/testCase';
import * as constants from '../../constants';
import {FeeLevel, UtxoProvider} from '../../services';
import {sinon} from '@loopback/testlab/dist/sinon';
import {getMockFeeLevelService} from '../helper';

describe('Signed Tx Controller', () => {
  let app: TwpapiApplication;
  let client: Client;
  let feeLevelService: FeeLevel;
  let feeProvider: sinon.SinonStub;
  let utxoProviderService: UtxoProvider;
  let utxoProvider: sinon.SinonStub;
  beforeEach(resetServices);

  async function resetServices() {
    const fee = getMockFeeLevelService();
    feeLevelService = fee.feeLevelService;
    feeProvider = fee.feeProvider;
    utxoProviderService = {utxoProvider: sinon.stub()};
    utxoProvider = utxoProviderService.utxoProvider as sinon.SinonStub;
    ({app, client} = await setupApplication([
      {name: 'services.FeeLevel', instance: feeLevelService},
      {name: 'services.UtxoProvider', instance: utxoProviderService},
    ]));
    const fast: number = process.env.FAST_MINING_BLOCK
      ? +process.env.FAST_MINING_BLOCK
      : 1;
    const average: number = process.env.AVERAGE_MINING_BLOCK
      ? +process.env.AVERAGE_MINING_BLOCK
      : 6;
    const slow: number = process.env.LOW_MINING_BLOCK
      ? +process.env.LOW_MINING_BLOCK
      : 12;
    feeProvider.withArgs(fast).resolves(['0.00003']);
    feeProvider.withArgs(average).resolves(['0.00002']);
    feeProvider.withArgs(slow).resolves(['0.00001']);
    Object.entries(baseState2.utxos).forEach(([address, utxos]) => {
      utxoProvider.withArgs(address).resolves(utxos);
    });
  }

  after(async () => {
    await app.stop();
  });

  it('invokes POST /signed-tx with P2PKH address', async () => {
    const peginConf = await client.get('/pegin-configuration').expect(200);
    await client
      .post('/balance')
      .send({
        sessionId: peginConf.body.sessionId,
        addressList: baseState2.addressList,
      })
      .expect(200);
    await client
      .post('/tx-fee')
      .send({
        sessionId: peginConf.body.sessionId,
        amount: 1000000,
        accountType: constants.BITCOIN_SEGWIT_ADDRESS,
      })
      .expect(200);
    const {
      amountToTransferInSatoshi,
      refundAddress,
      recipient,
      feeLevel,
      changeAddress,
    } = testCase1;
    const peginTxData = {
      sessionId: peginConf.body.sessionId,
      amountToTransferInSatoshi,
      refundAddress,
      recipient,
      feeLevel,
      changeAddress,
    };
    const peginTx = await client
      .post('/pegin-tx')
      .send(peginTxData)
      .expect(200);
    expect(peginTx.body.outputScriptHex.data).to.be.an.Array();
    const signedTxRequest = {
      sessionId: peginConf.body.sessionId,
      signatures: testCase1.signatures,
      addressList: [
        {
          address: '2ND7Zf42GPg1JJb5TQGYXkM4Ygz74spV8MR',
          publicKey: '04623fadfbb96c294312b5ea4a8ef0778ee0720acb9886ce6360c93230b3f32d15f25c99f39a70598029f8e5f0f233acae7945f2ed4318622717f3b535e2913ca4',
        },
        {
          address: '2ND7Zf42GPg1JJb5TQGYXkM4Ygz74spV8MR',
          publicKey: '04623fadfbb96c294312b5ea4a8ef0778ee0720acb9886ce6360c93230b3f32d15f25c99f39a70598029f8e5f0f233acae7945f2ed4318622717f3b535e2913ca4',
        }
      ],
    }
    const signedTx = await client
      .post('/signed-tx')
      .send(signedTxRequest)
      .expect(200);
    console.log(signedTx.body);
  });
  // it('invokes POST /pegin-tx with P2SH address', async () => {
  //   const peginConf = await client.get('/pegin-configuration').expect(200);
  //   const balance = await client
  //     .post('/balance')
  //     .send({
  //       sessionId: peginConf.body.sessionId,
  //       addressList: baseState2.addressList,
  //     })
  //     .expect(200);
  //   await client
  //     .post('/tx-fee')
  //     .send({
  //       sessionId: peginConf.body.sessionId,
  //       amount: Number((balance.body.nativeSegwit / 2).toFixed(0)),
  //       accountType: constants.BITCOIN_NATIVE_SEGWIT_ADDRESS,
  //     })
  //     .expect(200);
  //   const peginTxData = {
  //     sessionId: peginConf.body.sessionId,
  //     amountToTransferInSatoshi: Number(
  //       (balance.body.nativeSegwit / 2).toFixed(0),
  //     ),
  //     refundAddress: 'mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1',
  //     recipient: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
  //     feeLevel: constants.BITCOIN_FAST_FEE_LEVEL,
  //     changeAddress: '2NC4DCae9HdL6vjWMDbQwTkYEAB22MF3TPs',
  //   };
  //   const peginTx = await client
  //     .post('/pegin-tx')
  //     .send(peginTxData)
  //     .expect(200);
  //   expect(peginTx.body.inputs.length).to.be.greaterThan(0);
  //   expect(peginTx.body.outputs.length).to.be.exactly(3);
  //   expect(peginTx.body.outputScriptHex.data).to.be.Array();
  // });
  // it('invokes POST /pegin-tx with bech32 address', async () => {
  //   const peginConf = await client.get('/pegin-configuration').expect(200);
  //   const balance = await client
  //     .post('/balance')
  //     .send({
  //       sessionId: peginConf.body.sessionId,
  //       addressList: baseState2.addressList,
  //     })
  //     .expect(200);
  //   await client
  //     .post('/tx-fee')
  //     .send({
  //       sessionId: peginConf.body.sessionId,
  //       amount: Number((balance.body.nativeSegwit / 2).toFixed(0)),
  //       accountType: constants.BITCOIN_NATIVE_SEGWIT_ADDRESS,
  //     })
  //     .expect(200);
  //   const peginTxData = {
  //     sessionId: peginConf.body.sessionId,
  //     amountToTransferInSatoshi: Number(
  //       (balance.body.nativeSegwit / 2).toFixed(0),
  //     ),
  //     refundAddress: 'mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1',
  //     recipient: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
  //     feeLevel: constants.BITCOIN_FAST_FEE_LEVEL,
  //     changeAddress: 'tb1qtanvhhl8ve32tcdxkrsamyy6vq5p62ctdv89l0',
  //   };
  //   const peginTx = await client
  //     .post('/pegin-tx')
  //     .send(peginTxData)
  //     .expect(200);
  //   expect(peginTx.body.inputs.length).to.be.greaterThan(0);
  //   expect(peginTx.body.outputs.length).to.be.exactly(3);
  //   expect(peginTx.body.outputScriptHex.data).to.be.Array();
  // });
});
