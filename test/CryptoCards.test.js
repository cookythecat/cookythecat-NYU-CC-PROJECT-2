const {assert} = require('chai')

const Card = artifacts.require('./Card');

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

contract('Card', (accounts) => {
    let contract
    // before tells our tests to run this first before anything else 
    before( async () => {
        theirContractAddress = "0xaC57D467A4d3af9f0730DbAa1878232Be884E12d";
        contract = await Card.deployed() 
    })

    // testing container - describe 

    describe('deployment', async() => {
        // test samples with writing it 
        it('deploys successfuly', async() => {
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
        it('has a symbol', async() => {
            const sym = await contract.symbol()
            assert.equal(sym, 'CRD')
        })
        it('has a name', async() => {
            const symbol = await contract.name()
            assert.equal(symbol, 'Card')
        })
    })

    describe('mint', async() => {
        it('mint succeeds', async() => {
            const address = await contract.safeMint(theirContractAddress, "www.nyu.edu");
            await sleep(30000);
            const owner = await contract.tokenURI(0)
            assert.equal(owner, 'www.nyu.edu')
        })
    })

})