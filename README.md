# TransactionIndexingService
A proof of concept transaction indexing service that indexes data of a given EVM Blockchain.


### How to run:
1. `npm install`
2. `docker-compose up` to spin up a MongoDB instance
3. `npm run start-listener` to start the script that iterates over the blocks and transactions to index them in the DB
4. `npm run start` to start the API service for querying the indexed transactions or request indexing based on a given address


The project is configured to use the Goerli Testnet by default , but it can be updated through env vars. Check `config/index.js`.
