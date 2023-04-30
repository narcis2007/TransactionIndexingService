import { Joi } from '../validator/index.js';
import Model from '../Model.js';

export const postValidationSchema = {
  number: Joi.number(),
  hash: Joi.string(),
  chainId: Joi.number(),
  timestamp: Joi.number(),
};
export class BlockModel extends Model {
  constructor(dbAdapter) {
    super(dbAdapter, postValidationSchema);
  }

  async create(data) {
    const blockData = {
      ...data,
    };
    this.validate(blockData);

    return this.dbAdapter.create(blockData);
  }

  async getLatestBlock() {
    return this.dbAdapter.getLatestBlock();
  }
}
