import config from '../config/index.js';
import newMongoose from './lib/mongoose.js';

import { TransactionMongooseAdapter } from './lib/transactions/TransactionMongooseAdapter.js';
import { TransactionModel } from './lib/transactions/TransactionModel.js';

import { BlockMongooseAdapter } from './lib/blocks/BlockMongooseAdapter.js';
import { BlockModel } from './lib/blocks/BlockModel.js';

const mongooseInstance = newMongoose(config.mongo);

// Adapters
const transactionMongooseAdapter = TransactionMongooseAdapter(mongooseInstance);
const blockMongooseAdapter = BlockMongooseAdapter(mongooseInstance);

const models = {
  // DB Connectors
  mongooseInstance,

  // Models
  transaction: new TransactionModel(transactionMongooseAdapter),
  block: new BlockModel(blockMongooseAdapter),
};

export default models;
