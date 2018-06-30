var express = require('express');
var fs = require('fs');
var app = express();
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var web3w = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8546"));

var storageContract;
var contractWebsocket;
var account;

fs.readFile('./config/simplestorage.json', 'utf-8', function (err, data) {
    if (err) throw err
	storageJSON = JSON.parse(data);
    StorageAddress = storageJSON.address;
	StorageInterface = storageJSON.interface;
    storageContract = new web3.eth.Contract(StorageInterface, StorageAddress);
    contractWebsocket = new web3w.eth.Contract(StorageInterface, StorageAddress);
})

app.get('/get', function (req, res) {
    var num;
    async function main() {
        num = await storageContract.methods.get().call();
        res.send(num);
    }
    main().catch(err => console.error(err))   
});

app.get('/set/:num', function (req, res) {
    console.log(req.params.num);
    async function main() {
        account = await web3.eth.getAccounts();
        storageContract.methods.set(req.params.num).send({
                from: account[0]
            }, function (error, transactionHash) {
                console.log(transactionHash);
                console.log(error);

                contractWebsocket.once('Change', {
                    fromBlock: "latest"
                }, function (error, event) {
                    console.log(event);
                    res.send(transactionHash);
                });

        });
    }
    main().catch(err => console.error(err))   
});

app.listen(4001);
console.log('Listening on port 4001...');