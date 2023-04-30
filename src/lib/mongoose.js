/* eslint-disable func-names,no-param-reassign,no-underscore-dangle */
import mongoose from 'mongoose';

function newMongoose(config) {
  let initialized;
  if (config.debug) {
    mongoose.set('debug', config.debug);
  }

  mongoose.set('toObject', {
    versionKey: false,
    minimize: false,
    useProjection: true,
    transform(doc, ret) { delete ret._id; return ret; },
  });

  if (!initialized) {
    // enable lean option globally (https://mongoosejs.com/docs/tutorials/lean.html)
    const defOptions = { lean: true };
    const { setOptions } = mongoose.Query.prototype;
    mongoose.Query.prototype.setOptions = function (...args) {
      args[0] = args[0] ? { ...defOptions, ...args[0] } : defOptions;
      setOptions.apply(this, args);
      return this;
    };

    const { select } = mongoose.Query.prototype;
    mongoose.Query.prototype.select = function (...args) {
      if (!args[0]) {
        this._defProjection = true;
        select.apply(this, [{ _id: 0, __v: 0 }]);
      } else {
        if (this._defProjection) {
          delete this._fields;
          delete this._userProvidedFields;
        }
        select.apply(this, args);
      }

      return this;
    };

    mongoose.Query.prototype.lean = function () {
      this._mongooseOptions.lean = true;
      return this;
    };
  }

  const dbConnection = mongoose.createConnection(config.connectionUrl, config.mongoose);
  dbConnection.on('error', (err) => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });

  initialized = true;

  return dbConnection;
}

export default newMongoose;
