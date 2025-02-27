import {bridge} from '@rsksmart/rsk-precompiled-abis';
import Web3 from 'web3';

const web3 = new Web3();
const bridgeInstance = bridge.build(web3);

export enum BRIDGE_METHODS {
  REGISTER_BTC_TRANSACTION = 'registerBtcTransaction',
  UPDATE_COLLECTIONS = 'updateCollections'
};

export enum BRIDGE_EVENTS {
  LOCK_BTC = 'lock_btc',
  PEGIN_BTC = 'pegin_btc',
  REJECTED_PEGIN = 'rejected_pegin',
  RELEASE_REQUESTED = 'release_requested',
  UNREFUNDABLE_PEGIN = 'unrefundable_pegin'
};

export function getBridgeSignature(methodOrEvent: BRIDGE_METHODS | BRIDGE_EVENTS): string {
  const method = bridgeInstance._jsonInterface.find((m: any) => m.name === methodOrEvent);
  if (!method) {
    throw new Error(methodOrEvent + " does not exist in Bridge abi");
  }
  return <string>method.signature;
}

export function getBridgeMethodABI(method: BRIDGE_METHODS): any {
  const abi = bridge.abi.find((m: any) => m.name === method);
  if (!abi) {
    throw new Error(method + " does not exist in Bridge abi");
  }
  return abi;
}

export function encodeBridgeMethodParameters(method: BRIDGE_METHODS, args: Array<any>): any {
  const abi = getBridgeMethodABI(method);

  return web3.eth.abi.encodeParameters(
    abi.inputs,
    args
  );
}

export function decodeBridgeMethodParameters(method: BRIDGE_METHODS, data: string): any {
  const abi = getBridgeMethodABI(method);

  return web3.eth.abi.decodeParameters(abi.inputs, data);
}
