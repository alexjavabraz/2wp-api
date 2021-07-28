import {Model, model, property} from '@loopback/repository';

@model()
export class SignedTxResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  signedTx: string;

  constructor(data?: Partial<SignedTxResponse>) {
    super(data);
  }
}

export interface SignedTxResponseRelations {
  // describe navigational properties here
}

export type SignedTxResponseWithRelations = SignedTxResponse &
  SignedTxResponseRelations;
