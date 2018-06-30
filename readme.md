# Geth web3.js base project

## Start geth

Go to geth folder and follow the steps, if you are never done this please visit this repo:

https://github.com/DavidBelinchon/Geth-for-beginners


## Run the server

Go to server folder, and install dependencies

    npm  install

Then you need deploy the contract, type this:

    npm run deploy simplestorage
    
Now you can run the server:

    node nodeserver.js


## Let's check

Visit http://localhost:4001/get you should see "23"

Now you can change the number typing for example: http://localhost:4001/set/34

in some seconds you should see the transactionhash of this transaction

Done! :)