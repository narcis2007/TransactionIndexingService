import pkg from 'lodash';
const { pick } = pkg;
import { validate } from './validator/index.js';
import AppError from './AppError.js';
import Page from './Page.js';

export default class Model {
  constructor(dbAdapter, modelSchema) {
    this.dbAdapter = dbAdapter;
    if (modelSchema) {
      this.setSchema(modelSchema);
    }
  }

  setSchema(schema) {
    this.schema = schema;
    this.schemaFields = Object.keys(this.schema);
  }

  validate(data) {
    const valid = validate(data, this.schema, { abortEarly: false, stripUnknown: true });
    if(valid.errors){
      console.log(data)
      console.log(valid.errors)
    }
    AppError.assert(valid.ok, valid.errors, 422);
  }

  async findOne(filter) {
    return this.dbAdapter.findOne(filter);
  }

  async exists(filter) {
    return (await this.dbAdapter.countDocuments(filter)) > 0;
  }

  async getPaginated(filter, pagination, sortOptions) {
    return this.toAppPage(await this.dbAdapter.findPaginated(filter, pagination, sortOptions));
  }

  toJSON(modelData, skipSchemaValidation = false) {
    if (!modelData) return null;
    if (skipSchemaValidation) {
      return modelData;
    }
    return pick(modelData, this.schemaFields);
  }

  toAppPage({ pageInfo, items }, skipSchemaValidation = false) {
    return new Page(items.map((item) => this.toJSON(item, skipSchemaValidation)), pageInfo);
  }
}
