import { Joi } from '../validator/validator.js';
import Model from '../Model.js';

export const transactionValidationSchema = {
  hash: Joi.string(),
  gas: Joi.number(),
  gasPrice: Joi.string(),
  input: Joi.string(),
  value: Joi.string(),
  type: Joi.number(),
  chainId: Joi.string(),
  to: Joi.string().optional().allow(null),
  from: Joi.string(),
  transactionIndex: Joi.number(),
  blockNumber: Joi.number(),
  blockHash: Joi.string(),
  maxPriorityFeePerGas: Joi.string(),
  maxFeePerGas: Joi.string(),
  v: Joi.string(),
  r: Joi.string(),
  s: Joi.string(),
  nonce: Joi.number(),
};
export class TransactionModel extends Model {
  constructor(dbAdapter) {
    super(dbAdapter, transactionValidationSchema);
  }

  async create(data) {
    const transactionData = {
      ...data,
    };
    this.validate(transactionData);

    return this.dbAdapter.create(transactionData);
  }


}
