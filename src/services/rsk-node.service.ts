import Web3 from 'web3';

export class RskNodeService {
  web3: Web3;
  constructor() {
    this.web3 = new Web3(`${process.env.RSK_NODE_HOST}`);
  }
  getBlock(block: string | number, withTransactions = true): Promise<any> {
    return this.web3.eth.getBlock(block, withTransactions);
  }
  getTransactionReceipt(txHash: string): Promise<any> {
    return this.web3.eth.getTransactionReceipt(txHash);
  }
  getBlockNumber(): Promise<number> {
    return this.web3.eth.getBlockNumber();
  }
}
