import BaseController from '../BaseController.js';
import config from '../../../config/index.js';
import Web3 from 'web3';

const web3 = new Web3(config.web3.rpcUrl);

export default class TransactionController extends BaseController {
  constructor(models) {
    super();
    this.models = models;
  }

  async requestIndexingForAddress({ address, startBlockNumber, endBlockNumber }) {

    const end = endBlockNumber || await web3.eth.getBlockNumber();
    const start = startBlockNumber || end - 10;

    let transactionsFound = 0;

    for (var i = end; i >= start; i--) {
      console.log('Searching in block ' + i)

      var block = await web3.eth.getBlock(i, true);
      if (block != null && block.transactions != null) {
        await Promise.all(block.transactions.map(async (tx) => {
          if (web3.utils.toChecksumAddress(address) === tx.from || web3.utils.toChecksumAddress(address) === tx.to) {
           if(!await this.models.transaction.exists({ hash: tx.hash })){
             await this.models.transaction.create(tx);
           }
            transactionsFound++;
          }
        }));
      }
    }

    return { transactionsFound };
  }

  async getTransactions(searchConf) {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDir,
    } = this.getDefaultPaginationConf(searchConf);

    const page = await this.models.transaction.getPaginated(
      {
        ...(searchConf.to && {
          to: searchConf.to,
        }),
        ...(searchConf.from && {
          from: searchConf.from,
        }),
      },
      { pageNumber, pageSize },
      { [sortBy]: sortDir },
    );

    return {
      page: await page.render(async (tx) => tx),
    };
  }
}
