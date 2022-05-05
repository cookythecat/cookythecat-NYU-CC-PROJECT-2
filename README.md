# NFT Cards Game

## prerequisite

 - Truffle
 - npm
## Installation & Environment Setup
 - Run `git clone https://github.com/cookythecat/cookythecat-NYU-CC-PROJECT-2.git`
 - Run `cd <path to the project>\cookythecat-NYU-CC-PROJECT-2`
 - Put the private key that you want to `.env`
 - Run `truffle compile` to compile the NFT Card contract and market contract.
 - Go to to get some `Kovan ether`, you can go `https://faucets.chain.link/` to get some
 - Run `truffle migrate --reset --network kovan` to deploy the contracts to the `Kovan testnet`

## Usage

 - Run `npm run start` to start the game client
 - Go to `localhost:3000`
 - Click `Connect to Metamask` to connect your wallet with the game
 - Go to `https://faucets.chain.link/` to get some `Kovan ethers` and `Kovan links`
 - Go to `<path to the project>\cookythecat-NYU-CC-PROJECT-2\src\abis\Card.json`, and then go to `"networks"`, `"address"`. You would find an 256 bits address like this: `"address": "0xb10E5e2799843ac3D8F0721A02E9C78693751b3E".` This is the contract address of the card contract you just deployed. Please record it.
 - **Important:** please fund the address with some links. Each `Mint` would cost 0.25 links. If there is no link in the address, then you cannot`mint` NFT Card. You can do it by sending `link` from your `MetaMask` wallet to the address you just recorded. **Notice:** You need to import `link` to your wallet first. 
 - Now you can `mint` and `trade` NFT Cards.
