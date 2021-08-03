import {PeginConfiguration, TxInput, Utxo, WalletAddress} from '../models';
import {FeeLevel, UtxoProvider} from '../services';
import {sinon} from '@loopback/testlab/dist/sinon';

export function givenPeginConfiguration(
  peginConfiguration?: Partial<PeginConfiguration>,
) {
  const data = Object.assign(
    {
      sessionId: 'test_id',
    },
    peginConfiguration,
  );
  return new PeginConfiguration(data);
}

export function getLegacyAddressList(): WalletAddress[] {
  const addressList = [
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
  ];
  return addressList as WalletAddress[];
}
export function getSewitAddressList(): WalletAddress[] {
  const addressList = [
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
  ];
  return addressList as WalletAddress[];
}

export function getNativeSegwitAddressList(): WalletAddress[] {
  const addressList = [
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
  ];
  return addressList as WalletAddress[];
}

export function getUtxoList(): Utxo[] {
  const utxoList = [
    {
      address: 'tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr',
      txid: 'tx_id',
      vout: 2,
      amount: '0.00002',
      satoshis: 2000,
      height: 2,
      confirmations: 2,
    },
    {
      address: 'tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr',
      txid: 'tx_id2',
      vout: 2,
      amount: '0.00002',
      satoshis: 2000,
      height: 2,
      confirmations: 2,
    },
    {
      address: 'tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr',
      txid: 'tx_id3',
      vout: 2,
      amount: '0.00002',
      satoshis: 2000,
      height: 2,
      confirmations: 2,
    },
  ];
  return utxoList as Utxo[];
}

export function getMockInputs(): TxInput[] {
  const txInputs = [
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      address_n: [0],
      address: 'tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      prev_hash: 'tx_id',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      prev_index: 2,
      amount: '0.00002',
    },
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      address_n: [0],
      address: 'tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      prev_hash: 'tx_id2',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      prev_index: 2,
      amount: '0.00002',
    },
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      address_n: [0],
      address: 'tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      prev_hash: 'tx_id3',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      prev_index: 2,
      amount: '0.00002',
    },
  ];
  return txInputs as TxInput[];
}

export function getMockUtxoProviderService(): {utxoProviderService: UtxoProvider; utxoProvider: sinon.SinonStub;} {
  const utxoProviderService: UtxoProvider = {utxoProvider: sinon.stub()};
  const utxoProvider: sinon.SinonStub = utxoProviderService.utxoProvider as sinon.SinonStub;
  return {
    utxoProviderService,
    utxoProvider,
  };
}

export function getMockFeeLevelService(): {feeLevelService: FeeLevel; feeProvider: sinon.SinonStub;}{
  const feeLevelService: FeeLevel = {feeProvider: sinon.stub()};
  const feeProvider: sinon.SinonStub = feeLevelService.feeProvider as sinon.SinonStub;
  return {
    feeLevelService,
    feeProvider,
  };
}
