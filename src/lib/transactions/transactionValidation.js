import { Joi } from '../validator/index.js';
import { transactionValidationSchema } from './TransactionModel.js';
import pageValidationSchema from '../commonValidation.js';

const transactionValidation = {
  getTransactions: Joi.object()
    .concat(pageValidationSchema({
      maxPageSize: 100,
    }))
    .keys({
      to: transactionValidationSchema.to.optional(),
      from: transactionValidationSchema.from.optional(),
    }),
  requestIndexingForAddress: Joi.object()
    .keys({
      address: Joi.string().ethAddress(),
      startBlockNumber: Joi.number().optional(),
      endBlockNumber: Joi.number().optional(),
    }),
};

export default transactionValidation;
