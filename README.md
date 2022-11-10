# Beginner project web3

This is simple beginer project of Blockchain development.
Here a smart contract is deployed on goerli testnet.
where a message is stored and can be seen by anyone. Also it can be updated by
any user. 
* Frontend is made using React.
* For contract compilation an testing Hardhat is used.
* Alchemy Provider is used.
* node version 16.

Register on [Alchemy](https://www.alchemy.com/) platform to get API_KEY.

Also register on [etherscan](https://etherscan.io/) for interactive interface of smart contract and keeping track of it.

clone this repository in local environment.
create .env file and store **private key** and **api_key**.

sample .env file
``` test
API_URL="Your API URL"
PRIVATE_KEY="PRIVATE KEY of account"
ETHERSCAN_API_KEY="Etherscan API key"
```

To deploy the contract
``` Shell
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

## To start Frontend

change deployed address in __interact.js__ to address obtained in previous step.
* create __.env__ file.
* add REACT_APP_KEY="websocket alchemy key"

To start server/Frontend interface
``` Shell
cd frontend/ && npm install
npm start
```

 server should start and running now requests can be made from frontend.

> connect metamask wallet to update the message.
Make sure you are on goerli network in metamsk for transaction to be successfull.