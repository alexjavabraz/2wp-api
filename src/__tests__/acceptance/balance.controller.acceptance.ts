import {Client, expect} from '@loopback/testlab';
import {TwpapiApplication} from '../..';
import {setupApplication} from './test-helper';
import {baseState} from '../fixtures/testCase';
import {getMockFeeLevelService} from '../helper';
import {FeeLevel, UtxoProvider} from '../../services';
import {sinon} from '@loopback/testlab/dist/sinon';

describe('Balance Controller', () => {
  let app: TwpapiApplication;
  let client: Client;
  let feeLevelService: FeeLevel;
  let feeProvider: sinon.SinonStub;
  let utxoProviderService: UtxoProvider;
  let utxoProvider: sinon.SinonStub;
  beforeEach(resetRepositories);

  async function resetRepositories() {
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
  }

  after(async () => {
    await app.stop();
  });

  it('invokes POST /balance', async () => {
    Object.entries(baseState.utxos).forEach(([address, utxos]) => {
      utxoProvider.withArgs(address).resolves(utxos);
    });
    const peginConf = await client.get('/pegin-configuration').expect(200);
    const res = await client
      .post('/balance')
      .send({
        sessionId: peginConf.body.sessionId,
        addressList: baseState.addressList,
      })
      .expect(200);
    expect(typeof res.body.segwit).to.eql('number');
    expect(typeof res.body.nativeSegwit).to.eql('number');
    expect(typeof res.body.legacy).to.eql('number');
    expect(res.body.segwit).to.eql(baseState.balance.segwit);
    expect(res.body.nativeSegwit).to.eql(baseState.balance.nativeSegwit);
    expect(res.body.legacy).to.eql(baseState.balance.legacy);
  });
});
