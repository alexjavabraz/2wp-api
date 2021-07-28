import {Client, expect} from '@loopback/testlab';
import {TwpapiApplication} from '../..';
import {setupApplication} from './test-helper';
// import {sinon} from '@loopback/testlab/dist/sinon';
// import {FeeLevel, FeeLevelProvider} from '../../services';

describe('Balance Controller', () => {
  let app: TwpapiApplication;
  let client: Client;
  // let feeLevelService: FeeLevelProvider;
  // let feeProvider: sinon.SinonStub;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    // feeLevelService = {feeProvider: sinon.stub()};
    // feeProvider = feeLevelService.feeProvider as sinon.SinonStub;
    // app.service<FeeLevelProvider>(feeLevelService)
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /balance', async () => {
    const peginConf = await client.get('/pegin-configuration').expect(200);
    const res = await client
      .post('/balance')
      .send({
        sessionId: peginConf.body.sessionId,
        addressList: [
          {
            path: [2147483692, 2147483649, 2147483648, 0, 0],
            serializedPath: "m/44'/1'/0'/0/0",
            address: 'mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1',
          },
          {
            path: [2147483692, 2147483649, 2147483648, 1, 0],
            serializedPath: "m/44'/1'/0'/1/0",
            address: 'mqCjBpQ75Y5sSGzFtJtSQQZqhJze9eaKjV',
          },
          {
            path: [2147483697, 2147483649, 2147483648, 0, 0],
            serializedPath: "m/49'/1'/0'/0/0",
            address: '2NC4DCae9HdL6vjWMDbQwTkYEAB22MF3TPs',
          },
          {
            path: [2147483697, 2147483649, 2147483648, 1, 0],
            serializedPath: "m/49'/1'/0'/1/0",
            address: '2NCZ2CNYiz4rrHq3miUHerUMcLyeWU4gw9C',
          },
          {
            path: [2147483732, 2147483649, 2147483648, 0, 0],
            serializedPath: "m/84'/1'/0'/0/0",
            address: 'tb1qtanvhhl8ve32tcdxkrsamyy6vq5p62ctdv89l0',
          },
          {
            path: [2147483732, 2147483649, 2147483648, 1, 0],
            serializedPath: "m/84'/1'/0'/1/0",
            address: 'tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr',
          },
        ],
      })
      .expect(200);
    expect(typeof res.body.segwit).to.eql('number');
    expect(typeof res.body.nativeSegwit).to.eql('number');
    expect(typeof res.body.legacy).to.eql('number');
  });
});
