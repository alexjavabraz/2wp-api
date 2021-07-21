import {Model, model, property} from '@loopback/repository';
import {TxInput} from './tx-input.model';
import {TxOutput} from './tx-output.model';
import {Transaction} from '@ledgerhq/hw-app-btc/lib/types';

@model()
export class NormalizedTx extends Model {
  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  inputs: TxInput[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  outputs: TxOutput[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  ledgerInputs: Transaction[];

  @property({
    type: 'Buffer',
    required: true,
  })
  outputScriptHex: Buffer;

  constructor(data?: Partial<NormalizedTx>) {
    super(data);
  }
}

export type NormalizedTxWithRelations = NormalizedTx;
