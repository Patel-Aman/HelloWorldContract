
require('dotenv').config();
const contractABI = require('../contract-abi.json');
const alchemyKey = process.env.REACT_APP_KEY;
const contractAddress = "0x4a0152ccccb7107EF20Aa777d1F93b2c33333a01";

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

export const helloWorldContract = new web3.eth.Contract(contractABI, contractAddress);

export const loadCurrentMessage = async () => { 
  const message = await helloWorldContract.methods.message().call();
  return message;
};

export const connectWallet = async () => {
  if(window.ethereum) {
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        if(accounts.length > 0) {
            return ({
                address: accounts[0],
                status: "👆🏽 Write a message in the text-field above."
            });
        }
        else {
            return ({
                address: "",
                status: "🦊 Connect to Metamask using the top right button."
            });
        }
    }
    catch(err) {
        return ({
            address: "",
            status: "😥 " + err.message
        })
    }
  }
  else {
    return ({
        address: "",
        status: (
            <span>
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser.
                </a>
              </p>
            </span>
          )
    });
  }
};

export const getCurrentWalletConnected = async () => {
    if(window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });
    
            if(accounts.length > 0) {
                return ({
                    address: accounts[0],
                    status: "👆🏽 Write a message in the text-field above."
                });
            }
            else {
                return ({
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button."
                });
            }
        }
        catch(err) {
            return ({
                address: "",
                status: "😥 " + err.message
            })
        }
      }
      else {
        return ({
            address: "",
            status: (
                <span>
                  <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download`}>
                      You must install Metamask, a virtual Ethereum wallet, in your
                      browser.
                    </a>
                  </p>
                </span>
              )
        });
      }
};

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return ({
        status: "💡 Connect your Metamask wallet to update the message on the blockchain."
    });
  }

  if(message.trim() === "") {
    return ({
        status: "❌ Your message cannot be an empty string."
    });
  }

  const txParams = {
    to: contractAddress,
    from: address,
    data: helloWorldContract.methods.updateMsg(message).encodeABI()
  };

  try {
    const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams]
   });

   return ({
    status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      )
   });
  }
  catch(err) {
    return ({
        status: "😥 " + err.message
    })
  }
};
