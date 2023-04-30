import Web3 from 'web3';
import config from '../../../config/index.js';

const web3 = new Web3(config.web3.rpcUrl);

export default (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.ethAddress': '{{#label}} must be a valid ETH address',
  },
  rules: {
    ethAddress: {
      validate(value, helpers) {
        if (!web3.utils.isAddress(value)) {
          return helpers.error('string.ethAddress', { value });
        }

        return web3.utils.toChecksumAddress(value);
      },
    },
  },
});
