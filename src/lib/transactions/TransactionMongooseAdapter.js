import mongoosePaginate from 'mongoose-paginate-v2';
import pkg from 'mongoose';
import MongooseAdapterModel from '../MongooseAdapterModel.js';

const { Schema } = pkg;

export const transactionSchemaFields = {
  to: { type: String, required: false },
  from: { type: String },
  blockHash: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
  blockNumber: { type: Number, index: true, required: true },
  transactionIndex: { type: Number },
  data: { type: String },
  nonce: { type: Number },
  gas: { type: Number },
  gasPrice: { type: String },
  maxPriorityFeePerGas: { type: String },
  maxFeePerGas: { type: String },
  value: { type: String },
  chainId: { type: String },
  type: { type: Number },
  input: { type: String },
  v: { type: String },
  r: { type: String },
  s: { type: String },
};

export function TransactionMongooseAdapter(mongoose) {
  const transactionSchema = new Schema(transactionSchemaFields, { timestamps: false });
  class Transaction extends MongooseAdapterModel {
  }

  transactionSchema.plugin(mongoosePaginate);
  transactionSchema.loadClass(Transaction);

  return mongoose.model('Posts', transactionSchema, 'transactions');
}
