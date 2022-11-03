import React from "react";
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js";

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("No connection to the network."); //default message
  const [newMessage, setNewMessage] = useState("");

  //called only once
  useEffect(() => {
    
    const fecthMsg = async () => {
      const currentMsg = await loadCurrentMessage();
      setMessage(currentMsg);
    };

    fecthMsg();
    addSmartContractListener();

    const fetchWallet = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    };

    fetchWallet();
    addWalletListener();
  }, []);

  function addSmartContractListener() {
    helloWorldContract.events.update({}, (error, data) => {
      if(error) {
        setStatus("😥 " + error.message);
      }
      else {
        setStatus("🎉 Your message has been updated!");
        setMessage(data.returnValues[1]);
        setNewMessage("");
      }
    });
  }

  async function addWalletListener() {
    if(window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWallet(accounts[0]);
      })
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
  }

  const connectWalletPressed = async () => {
    const { address, status } = await connectWallet();
    setWallet(address);
    setStatus(status);
  };

  const onUpdatePressed = async () => {
    const { status } = await updateMessage(walletAddress, newMessage);
    setStatus(status);
  };

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src='./logo.png' alt="logo"></img>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
      <p>{message}</p>

      <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

      <div>
        <input
          type="text"
          placeholder="Update the message in your smart contract."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <p id="status">{status}</p>

        <button id="publish" onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  );
};

export default HelloWorld;
