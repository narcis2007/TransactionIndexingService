import mongoosePaginate from 'mongoose-paginate-v2';
import pkg from 'mongoose';
import MongooseAdapterModel from '../MongooseAdapterModel.js';

const { Schema } = pkg;

export const blockSchemaFields = {
  number: { type: Number, index: true, required: true, unique: true },
  chainId: { type: Number, index: true, required: true },
  hash: { type: String, index: true, unique: true },
  timestamp: { type: Number, index: true },
};

export function BlockMongooseAdapter(mongoose) {
  const blockSchema = new Schema(blockSchemaFields, { timestamps: false });
  class Block extends MongooseAdapterModel {
    static async getLatestBlock(opts = { readPreference: 'secondaryPreferred' }) {
      const objects = await this.find({})
          .limit(1)
          .sort({ number: -1 })
          .read(opts.readPreference)
          .exec();
      return objects.length > 0 ? objects[0] : null;
    }
  }

  blockSchema.plugin(mongoosePaginate);
  blockSchema.loadClass(Block);

  return mongoose.model('Blocks', blockSchema, 'blocks');
}
