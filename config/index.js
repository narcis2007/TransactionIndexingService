const config = {
  app: {
    port: process.env.PORT || 8000,
    name: 'TransactionIndexingService',
  },
  mongo: {
    connectionUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/transactionIndexingService',
    debug: !process.env.PROCESS_NAME,
    mongoose: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      serverSelectionTimeoutMS: typeof process.env.MONGO_SERVER_SELECTION_TIMEOUT === 'undefined' ? 10000 : Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT),
      connectTimeoutMS: typeof process.env.MONGO_CONNECT_TIMEOUT === 'undefined' ? 10000 : Number(process.env.MONGO_CONNECT_TIMEOUT),
    },
  },
  web3: {
    rpcUrl: process.env.WEB3_RPC || 'wss://goerli.infura.io/ws/v3/6142c3761fad41729e42d296324921c6',
    chainId: typeof process.env.WEB3_CHAIN_ID === 'undefined' ? 5 : Number(process.env.WEB3_CHAIN_ID),
  },
};
export default config;
