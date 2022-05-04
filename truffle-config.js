require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

const private_key = [
  process.env.PRIVATE_KEY_0
]

module.exports = {

  networks: {
    development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 8545,            // Standard Ethereum port (default: none)
    network_id: "*",       // Any network (default: none)
    },
    kovan: {
      provider: function(){
        return new HDWalletProvider({
          privateKeys : private_key,
          providerOrUrl : 'wss://kovan.infura.io/ws/v3/0dd6492e0b7048369662732618e7b272',
          numberOfAddresses: 1
        })
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis',

  compilers: {
    solc: {
     version:'^0.8.4',
     optimizer:{
       enabled:'true',
       runs: 200
     }
    }
  },

};