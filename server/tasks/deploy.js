var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var solc = require('solc');
var fs = require('fs') // file system

var account;
web3.eth.getAccounts().then(console.log);



var fileName = 'contract/' + process.argv[2] + '.sol';
console.log(fileName)

var configContracts;


/*
	params:
		1- name of contract
*/

fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
       console.log('deploy/deploy.js: error=' + err);   
    }

	var output = solc.compile(data, 1); // 1 activates the optimiser
	
	async function main () {
		account = await web3.eth.getAccounts();
		for (var contractName in output.contracts) {
			deploy(contractName,output)
		}
	}
	main().catch(err => console.error(err))
});

function deploy(contractName,output){
	
	var simpleContract = new web3.eth.Contract(JSON.parse(output.contracts[contractName].interface));

	var simple = simpleContract.deploy({arguments: [123],data: "0x"+output.contracts[contractName].bytecode}).send({from:account[0], gas: 0x6B8D80}).then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
        configContracts = {
            address: newContractInstance.options.address,
            interface: newContractInstance.options.jsonInterface
        }
        console.log(contractName.substring(1))
        fs.writeFileSync('config/' + contractName.substring(1) +'.json', JSON.stringify(configContracts));
        
    });
	
	
}
