import {Model, model, property} from '@loopback/repository';

@model()
export class SignedTxRequest extends Model {
  @property({
    type: 'string',
    required: true,
  })
  sessionId: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  signatures: string[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  addressList: {address: string; publicKey: string}[];

  constructor(data?: Partial<SignedTxRequest>) {
    super(data);
  }
}

export interface SignedTxRequestRelations {
  // describe navigational properties here
}

export type SignedTxRequestWithRelations = SignedTxRequest &
  SignedTxRequestRelations;
