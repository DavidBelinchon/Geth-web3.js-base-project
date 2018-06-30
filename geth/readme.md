# Geth

## Download geth

https://geth.ethereum.org/downloads/ 

Geth/v1.7.2-stable-1db4ecdc/windows-amd64/go1.9

## Create Genesis json
genesis.json >>

{
    "config": {
        "chainId": 1234,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "0x1",
    "gasLimit": "0xFFFFFF",
    "coinbase":"0x3333333333333333333333333333333333333333",
    "alloc": {}
}


## Create password file
	echo password >> password

## Create a data directory
	mkdir datadir

## Create an Ethereum account
	./geth.exe --password password --datadir datadir account new

## Init genesis
	 ./geth.exe --datadir datadir init genesis.json

## Run with first account locked
./geth.exe --networkid 1234 --rpc --rpccorsdomain "*" --rpcapi="db,eth,net,web3,personal,web3" --datadir datadir js GethStartupProcedure.js

or use this function into geth console:

web3.eth.personal.unlockAccount("address", "password", 0)


## Run with first account Unlocked 

./geth.exe --password password --networkid 1234 --ws --wsport 8546 --wsorigins "*" --rpc --rpccorsdomain "*" --rpcapi="db,eth,net,web3,personal,web3" --unlock 0 --datadir datadir js GethStartupProcedure.js


## compile contract

* remix : 127.0.0.1:8545

* compile the contract simpleStorage.sol!!