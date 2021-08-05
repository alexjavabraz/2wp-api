import {Client, expect} from '@loopback/testlab';
import {TwpapiApplication} from '../..';
import {setupApplication} from './test-helper';
import {baseState, testCase0} from '../fixtures/testCase';
import * as constants from '../../constants';

describe('Pegin Tx Controller', () => {
  let app: TwpapiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });
  after(async () => {
    await app.stop();
  });

  it('invokes POST /pegin-tx with P2PKH address', async () => {
    const peginConf = await client.get('/pegin-configuration').expect(200);
    const balance = await client
      .post('/balance')
      .send({
        sessionId: peginConf.body.sessionId,
        addressList: baseState.addressList,
      })
      .expect(200);
    await client
      .post('/tx-fee')
      .send({
        sessionId: peginConf.body.sessionId,
        amount: Number((balance.body.legacy / 2).toFixed(0)),
        accountType: constants.BITCOIN_LEGACY_ADDRESS,
      })
      .expect(200);
    const {
      amountToTransferInSatoshi,
      refundAddress,
      recipient,
      feeLevel,
      changeAddress,
    } = testCase0;
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
    expect(peginTx.body.inputs.length).to.be.greaterThan(0);
    expect(peginTx.body.outputs.length).to.be.exactly(3);
    expect(peginTx.body.outputScriptHex.data).to.be.Array();
  });
  it('invokes POST /pegin-tx with P2SH address', async () => {
    const peginConf = await client.get('/pegin-configuration').expect(200);
    const balance = await client
      .post('/balance')
      .send({
        sessionId: peginConf.body.sessionId,
        addressList: baseState.addressList,
      })
      .expect(200);
    await client
      .post('/tx-fee')
      .send({
        sessionId: peginConf.body.sessionId,
        amount: Number((balance.body.nativeSegwit / 2).toFixed(0)),
        accountType: constants.BITCOIN_NATIVE_SEGWIT_ADDRESS,
      })
      .expect(200);
    const peginTxData = {
      sessionId: peginConf.body.sessionId,
      amountToTransferInSatoshi: Number(
        (balance.body.nativeSegwit / 2).toFixed(0),
      ),
      refundAddress: 'mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1',
      recipient: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
      feeLevel: constants.BITCOIN_FAST_FEE_LEVEL,
      changeAddress: '2NC4DCae9HdL6vjWMDbQwTkYEAB22MF3TPs',
    };
    const peginTx = await client
      .post('/pegin-tx')
      .send(peginTxData)
      .expect(200);
    expect(peginTx.body.inputs.length).to.be.greaterThan(0);
    expect(peginTx.body.outputs.length).to.be.exactly(3);
    expect(peginTx.body.outputScriptHex.data).to.be.Array();
  });
  it('invokes POST /pegin-tx with bech32 address', async () => {
    const peginConf = await client.get('/pegin-configuration').expect(200);
    const balance = await client
      .post('/balance')
      .send({
        sessionId: peginConf.body.sessionId,
        addressList: baseState.addressList,
      })
      .expect(200);
    await client
      .post('/tx-fee')
      .send({
        sessionId: peginConf.body.sessionId,
        amount: Number((balance.body.nativeSegwit / 2).toFixed(0)),
        accountType: constants.BITCOIN_NATIVE_SEGWIT_ADDRESS,
      })
      .expect(200);
    const peginTxData = {
      sessionId: peginConf.body.sessionId,
      amountToTransferInSatoshi: Number(
        (balance.body.nativeSegwit / 2).toFixed(0),
      ),
      refundAddress: 'mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1',
      recipient: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
      feeLevel: constants.BITCOIN_FAST_FEE_LEVEL,
      changeAddress: 'tb1qtanvhhl8ve32tcdxkrsamyy6vq5p62ctdv89l0',
    };
    const peginTx = await client
      .post('/pegin-tx')
      .send(peginTxData)
      .expect(200);
    expect(peginTx.body.inputs.length).to.be.greaterThan(0);
    expect(peginTx.body.outputs.length).to.be.exactly(3);
    expect(peginTx.body.outputScriptHex.data).to.be.Array();
  });
});
