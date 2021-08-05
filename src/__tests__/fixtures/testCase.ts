import * as constants from '../../constants';
export const baseState = {
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
  utxos: {
    mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1: [
      {
        txid: 'b7ae94b7dd730568bc0c68a466b732e6a00ca68ce47eabf410476c67ba04124a',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1970154,
        confirmations: 91952,
      },
      {
        txid: '00d564169e0ffccd35a20ac10ca5b012c5a46f377125d21d00f24939110dd457',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1966389,
        confirmations: 95717,
      },
      {
        txid: '524240446bcbcc593bc3dec40097088674c71dc3b945a1a0a748a28d78638da3',
        vout: 1,
        amount: '0.0003',
        satoshis: 30000,
        height: 1902390,
        confirmations: 159716,
      },
      {
        txid: '70f43755a89d08bd25cc2101dc56cdadd4a76ebf629ddd67c570d7f019b3e520',
        vout: 0,
        amount: '0.0003',
        satoshis: 30000,
        height: 1902390,
        confirmations: 159716,
      },
      {
        txid: 'f51d35a0dae46f453d3f301c016c75adc5bce533038433ea32d721bb4d0d83ec',
        vout: 0,
        amount: '0.001',
        satoshis: 100000,
        height: 1902389,
        confirmations: 159717,
      },
      {
        txid: 'fcbf9001cf8fe2427a9bfbcef82d81ba35ab85f9cdb5bdc66cf60b06ade8a2cd',
        vout: 1,
        amount: '0.0001',
        satoshis: 10000,
        height: 1902389,
        confirmations: 159717,
      },
      {
        txid: '02bbae5558116af90595d8deb4dbc7db14116027a08777d1d6fb1fd4bfa9dd78',
        vout: 0,
        amount: '0.0001',
        satoshis: 10000,
        height: 1902389,
        confirmations: 159717,
      },
      {
        txid: 'c04e9565df3e294b3bc04a5c21a1305653843a6069296103b74e9c04b04e0421',
        vout: 0,
        amount: '0.0001',
        satoshis: 10000,
        height: 1902389,
        confirmations: 159717,
      },
    ],
    mqCjBpQ75Y5sSGzFtJtSQQZqhJze9eaKjV: [],
    '2NC4DCae9HdL6vjWMDbQwTkYEAB22MF3TPs': [],
    '2NCZ2CNYiz4rrHq3miUHerUMcLyeWU4gw9C': [],
    tb1qtanvhhl8ve32tcdxkrsamyy6vq5p62ctdv89l0: [
      {
        txid: 'ef0eab31676a5a591d9cfc03def73eb3600f93b294ba57b13cf4f76786b2f89b',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1939623,
        confirmations: 122484,
      },
      {
        txid: 'ac904d5188bb6f55917f2e66f1518256e8f181c99460aba0c9eb5fe3b921333c',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1939623,
        confirmations: 122484,
      },
      {
        txid: '4dc33519583b5fa2b8a089d0282adf1d13e7255a09f93d1431ab5b8a5e95b338',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1939555,
        confirmations: 122552,
      },
      {
        txid: 'f8c6f97be832a74f5a97236da5710335cf8a242b6795074ccc1fd03b4547a806',
        vout: 0,
        amount: '0.00017',
        satoshis: 17000,
        height: 1904041,
        confirmations: 158066,
      },
    ],
    tb1qfuk3j0l4qn4uzstc47uwk68kedmjwuucl7avqr: [],
  },
  balance: {
    segwit: 0,
    legacy: 2190000,
    nativeSegwit: 3017000,
  },
};

export const baseState2 = {
  utxos: {
    mhiaFELaNfUxzLn1mFxHsBgFpky6dD1ByW: [],
    '2NAkigr26w3i73HA5B5SUN2G3RnbbXVARiR': [
      {
        txid: 'd52481952b1af712c78a169f9e44d2b136f2164a6deb48b41d500ff8d88e5c4d',
        vout: 2,
        amount: '0.00999478',
        satoshis: 999478,
        height: 2061094,
        confirmations: 1862,
      },
      {
        txid: '33d3334d521a13c128bbc6254ce5e539790455c4a6d225a93e590717953059c9',
        vout: 2,
        amount: '0.00999482',
        satoshis: 999482,
        height: 2034532,
        confirmations: 28424,
      },
      {
        txid: '77300faaf68183d353b9480db1e125af6fc97c71dc3d71f1ad9f990f0556b11e',
        vout: 2,
        amount: '0.00999482',
        satoshis: 999482,
        height: 2034390,
        confirmations: 28566,
      },
      {
        txid: '72f14da739d126829dc0ec631e4644374c986608f6e4f1014e7dda20458bca46',
        vout: 2,
        amount: '0.00997563',
        satoshis: 997563,
        height: 2006850,
        confirmations: 56106,
      },
    ],
    tb1q0qnrdegcxpwch3qpgff60s9sazne3xqswvf4uj: [],
    mtqH7VWa3V3QfKanzVhDhWkxvMwJssMrC9: [
      {
        txid: 'dfce54d05da02af9c9a99e61ca64f6aba2cad862cae235f7476f18df1f81199b',
        vout: 0,
        amount: '0.1',
        satoshis: 10000000,
        height: 2034533,
        confirmations: 28423,
      },
    ],
    '2ND7Zf42GPg1JJb5TQGYXkM4Ygz74spV8MR': [
      {
        txid: 'd52481952b1af712c78a169f9e44d2b136f2164a6deb48b41d500ff8d88e5c4d',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2061094,
        confirmations: 1862,
      },
      {
        txid: '4abf1cd1dd900b518eeacd293cff7e4f86f38ae21ee23b4fc07693a96b926ae2',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2006762,
        confirmations: 56194,
      },
      {
        txid: 'c2af8ed5a7f55d61961bedfdd7d5b9ce7a8e7ec88a17f71547d4789c6c6ca98f',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2006756,
        confirmations: 56200,
      },
      {
        txid: '20e68a009560812b8128d39c02d34dc44e4996959fe03dcb4f32f3c24c1a142e',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2006753,
        confirmations: 56203,
      },
      {
        txid: '87b3b756c25513fe45501476e674f0ea6e461169d857f84fbec11be6ed5cefc9',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2005338,
        confirmations: 57618,
      },
      {
        txid: 'b6017937a258c81809b7636380e7a48d8fe3acabd6348a51ed1e82b9da5f24aa',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2003946,
        confirmations: 59010,
      },
      {
        txid: 'c806bfab006db63d9a3d60a1efbd2f0bf2422d8f97f372585a0d12cd1aec4bb9',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2002034,
        confirmations: 60922,
      },
      {
        txid: 'e032e62b473e1833ee4da95c6fa45a295163e177d2dacca6a9f65234b31b71ac',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2000538,
        confirmations: 62418,
      },
      {
        txid: '45fb79c09fae23a239932c745193c42df3f1d736733ab5be5725e2bd330bfbcd',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 2000532,
        confirmations: 62424,
      },
      {
        txid: '96a253c0ba044c088cf234723e4ca57fba8331405519bd1777a2a4b86512428b',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1998651,
        confirmations: 64305,
      },
      {
        txid: '09a52472ec2e12bfa99accba039613d03c969ed4ecf67e172cd4fad686af52b3',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1998625,
        confirmations: 64331,
      },
      {
        txid: 'da4ea0ef3eba3eb983ba546f471b73cd1f4a0369ec1ba0b963af59e2de353387',
        vout: 1,
        amount: '0.01',
        satoshis: 1000000,
        height: 1976796,
        confirmations: 86160,
      },
    ],
    tb1qk8uawlrujrzt6m7usfplfq0t8srg9n97s9wuvc: [],
    mrZ1AWU6m4YKawC3kBX3rFNCMPaarPUVuP: [],
    '2MuV1kcu7ZhHzUQ2Jr66EDUqyKH1WqWtyCf': [],
    tb1q0wnnut6wfggp9t97trepacam33s58rv6gngsvl: [],
    mnV2kscToF8rCCRx4WSjidDSi1XULbyHVU: [],
    '2N9GZ1wBhePa1y6rPd4tfGuaf19yoerxwvY': [],
    tb1qad02e3325xpdce3hhgws9h3un324q00wvc4zm4: [],
  },
  addressList: [
    {
      address: 'mhiaFELaNfUxzLn1mFxHsBgFpky6dD1ByW',
      serializedPath: "m/44'/1'/0'/1/0",
      path: [2147483692, 2147483649, 2147483648, 1, 0],
      publicKey:
        '042420412c8223f1855416fb4fa0d0aeef09da79e2ef54bacd4633b182512c138705b4d73ae0e21c427cf3f9b9813b3f9ff3856b00246fdb53d6707dc4419b0172',
    },
    {
      address: '2NAkigr26w3i73HA5B5SUN2G3RnbbXVARiR',
      serializedPath: "m/49'/1'/0'/1/0",
      path: [2147483697, 2147483649, 2147483648, 1, 0],
      publicKey:
        '04ffbebbbb73891ee4c7265ceb50588e2ab0351f215ea2a3e1a0f1d1f3ab3668d987af0637d7c90b197a3243b6215695580cef9d168041dcf1232fa6c96a0e5669',
    },
    {
      address: 'tb1q0qnrdegcxpwch3qpgff60s9sazne3xqswvf4uj',
      serializedPath: "m/84'/1'/0'/1/0",
      path: [2147483732, 2147483649, 2147483648, 1, 0],
      publicKey:
        '04c0ed28e2326ca1b5de621f063e0d75bc0fae2cb55d1a389c8bdddfee08214f4a7a99e79a07a28f48e745507a4687f65594b978a17b27e3d47b74cac68538ab1e',
    },
    {
      address: 'mtqH7VWa3V3QfKanzVhDhWkxvMwJssMrC9',
      serializedPath: "m/44'/1'/0'/0/0",
      path: [2147483692, 2147483649, 2147483648, 0, 0],
      publicKey:
        '0415ade50928c65cde1e7369935721d9c4508ef56fb7372696c5135e7cc1d88d719b7381f561db11abb9bdac062ad51f41de94c10c629c4112ece8e5df762ba6cf',
    },
    {
      address: '2ND7Zf42GPg1JJb5TQGYXkM4Ygz74spV8MR',
      serializedPath: "m/49'/1'/0'/0/0",
      path: [2147483697, 2147483649, 2147483648, 0, 0],
      publicKey:
        '04623fadfbb96c294312b5ea4a8ef0778ee0720acb9886ce6360c93230b3f32d15f25c99f39a70598029f8e5f0f233acae7945f2ed4318622717f3b535e2913ca4',
    },
    {
      address: 'tb1qk8uawlrujrzt6m7usfplfq0t8srg9n97s9wuvc',
      serializedPath: "m/84'/1'/0'/0/0",
      path: [2147483732, 2147483649, 2147483648, 0, 0],
      publicKey:
        '0465e80d86a24bfecff5b4b6a9b50e1562b4df47392ef52ebd61c737172abdca7a82750da3dd177bdb7d9086824a12c3104784dfd6233df882d3204f5ed77d422a',
    },
    {
      address: 'mrZ1AWU6m4YKawC3kBX3rFNCMPaarPUVuP',
      serializedPath: "m/44'/1'/0'/1/1",
      path: [2147483692, 2147483649, 2147483648, 1, 1],
      publicKey:
        '042ec78bbaccf18c2c74930462c5ea6e32a6e19d6872c88c1c9621cb7ccb909e3abde321d18c3016e838409bc416f5c4a01be26addbe271c0b0b12fc074df16407',
    },
    {
      address: '2MuV1kcu7ZhHzUQ2Jr66EDUqyKH1WqWtyCf',
      serializedPath: "m/49'/1'/0'/1/1",
      path: [2147483697, 2147483649, 2147483648, 1, 1],
      publicKey:
        '0475dbca00d5afb3ae4c4ea705ff15fb154f1ea7d79eceebdc98699b015d8d7d94bd95133715c8b43557de2753e60a45792342e58b6849c18991ef8694136cbdbc',
    },
    {
      address: 'tb1q0wnnut6wfggp9t97trepacam33s58rv6gngsvl',
      serializedPath: "m/84'/1'/0'/1/1",
      path: [2147483732, 2147483649, 2147483648, 1, 1],
      publicKey:
        '04c0429156ac05a3fdae4085f68b8941033450fa7e48284da5174d85d52d9d0cfcc54ff8b1cb2b2e29136dad3285b9ed0ccd0253d18a3b9636d6b5815c48b1e5d9',
    },
    {
      address: 'mnV2kscToF8rCCRx4WSjidDSi1XULbyHVU',
      serializedPath: "m/44'/1'/0'/0/1",
      path: [2147483692, 2147483649, 2147483648, 0, 1],
      publicKey:
        '04988d8f81261359982e86a139af580023bf11f3254fc7495fc677892971b4f36d23267467499ddd102ecbff2d6f4c0a6eeb07bf9cf4feb5be7b522f99f7097552',
    },
    {
      address: '2N9GZ1wBhePa1y6rPd4tfGuaf19yoerxwvY',
      serializedPath: "m/49'/1'/0'/0/1",
      path: [2147483697, 2147483649, 2147483648, 0, 1],
      publicKey:
        '0446a0ae8028e492cb3516e6492eab268f328193cac4af3fe89467662bb56cab48d468f56c271e3d1e96898aa043f0a662d7a70f5f4f94e9adcbb76fb123f4d13e',
    },
    {
      address: 'tb1qad02e3325xpdce3hhgws9h3un324q00wvc4zm4',
      serializedPath: "m/84'/1'/0'/0/1",
      path: [2147483732, 2147483649, 2147483648, 0, 1],
      publicKey:
        '0497a95888e215bb9fdc55093a73f2eb33d2a154a5f397e0da2f8a5832333d102a792ce9cd997851465c4d5fbe2433b4301eeb542864304391113d771b16dd8f16',
    },
  ],
  balance: {
    legacy: 10000000,
    segwit: 15996005,
    nativeSegwit: 0,
  },
};

export const testCase1 = {
  amountToTransferInSatoshi: 1000000,
  changeAddress: '2NAkigr26w3i73HA5B5SUN2G3RnbbXVARiR',
  feeLevel: 'BITCOIN_AVERAGE_FEE_LEVEL',
  recipient: 'a44B9656Ba4163d0c8217467f649Ca97C75Dc6c7',
  refundAddress: 'mtqH7VWa3V3QfKanzVhDhWkxvMwJssMrC9',
  normalizedTx: {
    inputs: [
      {
        address: '2ND7Zf42GPg1JJb5TQGYXkM4Ygz74spV8MR',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        address_n: [0],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        prev_hash:
          'd52481952b1af712c78a169f9e44d2b136f2164a6deb48b41d500ff8d88e5c4d',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        prev_index: 1,
        amount: '1000000',
      },
      {
        address: '2ND7Zf42GPg1JJb5TQGYXkM4Ygz74spV8MR',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        address_n: [0],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        prev_hash:
          '4abf1cd1dd900b518eeacd293cff7e4f86f38ae21ee23b4fc07693a96b926ae2',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        prev_index: 1,
        amount: '1000000',
      },
    ],
    outputs: [
      {
        amount: '0',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        script_type: 'PAYTOOPRETURN',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        op_return_data:
          '52534b5401a44B9656Ba4163d0c8217467f649Ca97C75Dc6c7019210d4b58cf98e5e9a15824a815c30fa8f1054c5',
      },
      {
        amount: '1000000',
        address: '2ND7Zf42GPg1JJb5TQGYXkM4Ygz74spV8MR',
      },
      {
        amount: '999482',
        address: '2NAkigr26w3i73HA5B5SUN2G3RnbbXVARiR',
      },
    ],
  },
  signatures: [
    '30440220181436ed79275d1c7ebf2ceeab4427ef4d2fb23d26b10edc18560952ffaa1a7a0220714c1c7468b9ac1126c299e65c2275a4c2a844911ab21e357776ee927adef93f01',
    '30440220070bc9b16d6a050af735a093d3ea07c8ac83abcec6f1da76554dba628e593a1702204a44cd79fb0490c998f32c4b84311c4355ad3b6ee3712073cbc4d2458f848c9f01',
  ],
  signedTx:
    '020000000001024d5c8ed8f80f501db448eb6d4a16f236b1d2449e9f168ac712f71a2b958124d501000000171600145b1f58992154453df00df5562d00217d5f87ed10ffffffffe26a926ba99376c04f3be21ee28af3864f7eff3c29cdea8e510b90ddd11cbf4a01000000171600145b1f58992154453df00df5562d00217d5f87ed10ffffffff030000000000000000306a2e52534b5401a44b9656ba4163d0c8217467f649ca97c75dc6c7019210d4b58cf98e5e9a15824a815c30fa8f1054c540420f000000000017a914d9ef9b3a6aed871b2fd0523fe1b7a9b33fdfa1b9873a400f000000000017a914c00e28814d37826e061a3de349f3514520593df287024730440220181436ed79275d1c7ebf2ceeab4427ef4d2fb23d26b10edc18560952ffaa1a7a0220714c1c7468b9ac1126c299e65c2275a4c2a844911ab21e357776ee927adef93f012102623fadfbb96c294312b5ea4a8ef0778ee0720acb9886ce6360c93230b3f32d15024730440220070bc9b16d6a050af735a093d3ea07c8ac83abcec6f1da76554dba628e593a1702204a44cd79fb0490c998f32c4b84311c4355ad3b6ee3712073cbc4d2458f848c9f012102623fadfbb96c294312b5ea4a8ef0778ee0720acb9886ce6360c93230b3f32d1500000000',
};

export const testCase0 = {
  accountType: constants.BITCOIN_LEGACY_ADDRESS,
  amountToTransferInSatoshi: 100000,
  refundAddress: 'mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1',
  recipient: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
  feeLevel: constants.BITCOIN_FAST_FEE_LEVEL,
  changeAddress: 'mzMCEHDUAZaKL9BXt9SzasFPUUqM77TqP1',
  normalizedTx: undefined,
  signatures: [],
  signedTx: '',
};
