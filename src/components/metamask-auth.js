import React, { useEffect, useState } from "react";
import "./buttons.css"

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}


export default function MetaMaskAuth({ onAddressChanged }) {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
      <Address userAddress={userAddress} />
  ) : (
     <Connect setUserAddress={setUserAddress}/>
  );
}


function Connect({ setUserAddress }) {  
  return (
    <button class="btn-hover color-7" onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}


function Address({ userAddress }) {
  return (
    <button class="btn-hover color-7">{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</button>
  );
}