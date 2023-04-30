# TransactionIndexingService

This POC has a few differences compared to the architecture attached:
- There is no scaling/queue system to keep it simple.  
- The listener is the one who indexes the transactions directly
- There is no option to plug in analyzers  to get more interesting data out of the transactions
- Only one chain can be handled by a listener instance
- The API to request transactions to be indexed based on a given address only looks by default at the last 10 blocks but the start and end block number can be given in the request body. I added this feature because it was in the requirements but personally I would rather optimize the listener to go over blocks faster in a real world scenario to pick up the transactions because there is no proper way to search for transactions related to an address other than going over all blocks


A lot of features/improvements can be added to the current code but I believe the current form is just right for a POC. If there are requests to add more to it please contact me.
