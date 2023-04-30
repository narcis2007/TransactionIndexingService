import pkg from 'sleep';
const { sleep } = pkg;
import config from '../config/index.js';
import models from './models.js';
import Web3 from 'web3';

const { rpcUrl, chainId } = config.web3;

const web3 = new Web3(rpcUrl);

async function processTransactions(web3Block) {
  await Promise.all(web3Block.transactions.map(async (transaction) => {
    if(await models.transaction.findOne({ hash: transaction.hash }) === 0) {
      await models.transaction.create(transaction);
    }
  }));
}

export default async function listen() {
  let latestBlock = await models.block.getLatestBlock();

  let latestBlockNumber = latestBlock?.number + 1 || 0;
  while(true){
    if (latestBlockNumber <= await web3.eth.getBlockNumber()) {
      console.log('Processing block ' + latestBlockNumber)
      const web3Block = await web3.eth.getBlock(latestBlockNumber, true);
      await processTransactions(web3Block);
      latestBlock = await models.block.create({ ...web3Block, chainId } );
      latestBlockNumber++;
    } else {
      sleep(15);
    }
  }

}

listen();
