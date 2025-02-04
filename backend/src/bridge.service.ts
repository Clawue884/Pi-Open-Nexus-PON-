backend/src/bridge.service.ts

import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Keypair, Server, TransactionBuilder, Networks, Operation } from 'stellar-sdk';

@Injectable()
export class BridgeService {
  private web3: Web3;
  private stellarServer: Server;
  private ethContract;
  private bscContract;
  private stellarKeypair: Keypair;

  constructor() {
    this.web3 = new Web3('https://bsc-dataseed.binance.org/');
    this.stellarServer = new Server('https://horizon.stellar.org');
    this.stellarKeypair = Keypair.fromSecret(process.env.STELLAR_SECRET);
    
    const abi = [ /* ABI Smart Contract */ ];
    this.ethContract = new this.web3.eth.Contract(abi, process.env.ETH_CONTRACT);
    this.bscContract = new this.web3.eth.Contract(abi, process.env.BSC_CONTRACT);
  }

  async bridgeToEthereum(stellarTx: string) {
    const transaction = new TransactionBuilder(
      new Account(this.stellarKeypair.publicKey(), '0'),
      { fee: '100', networkPassphrase: Networks.PUBLIC }
    ).addOperation(
      Operation.payment({
        destination: process.env.ETH_RECEIVER,
        asset: Asset.native(),
        amount: '10'
      })
    ).setTimeout(30).build();
    
    transaction.sign(this.stellarKeypair);
    await this.stellarServer.submitTransaction(transaction);

    return { status: 'Success', txHash: transaction.hash().toString() };
  }

  async bridgeToBSC(stellarTx: string) {
    const tx = await this.bscContract.methods.deposit().send({ from: process.env.BSC_WALLET });
    return { status: 'Success', txHash: tx.transactionHash };
  }
}


---
