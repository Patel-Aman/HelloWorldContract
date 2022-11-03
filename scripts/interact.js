
require('dotenv').config();
const { ethers } = require('hardhat');
const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

const { API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

// provider
const provider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// contract
const HelloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    let message = await HelloWorldContract.message();

    console.log("Current message is:", message);

    console.log("updating message...");

    const tx = await HelloWorldContract.updateMsg("Check smartContractTracking 4!!!");
    await tx.wait();
    message = await HelloWorldContract.message();

    console.log("New message is:", message);
};

main()
.then( () => process.exit(0))
.catch( error => {
  console.error(error);
  process.exit(1);
});