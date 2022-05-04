import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import Market from "../abis/Market.json";
import Card from "../abis/Card.json";
const Web3Utils = require('web3-utils');
var BN = Web3Utils.BN;

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export class cardClass {
    constructor(tokenId, subAttributes, ability){
        this.tokenId = tokenId;
        this.subAttributes = subAttributes;
        this.ability = ability;
        this.show = false;
    }
}

export class marketCard {
    constructor(itemId, nftContract, tokenId, seller, owner, price, sold, subAttributes){
        this.itemId = itemId
        this.nftContract = nftContract
        this.tokenId = tokenId
        this.seller = seller
        this.owner = owner
        this.price = price
        this.sold = sold
        this.subAttributes = subAttributes
        this.show = false
    }
}

export async function sliceBNIntoArr(bigint){
    var res = []
    for (var i=1; i <= 8; i++) {
        const current_res = sliceBN(bigint, 256 - (i * 32) + 1, 32)
        res.push(current_res.toNumber())
    }
    return res
}

export function sliceBN(bigint, start, length){
    if(length < 0){
        throw 'selected length is not invalid';
    }
    // 110100100001000110001
    // ---------------------
    //     ^         ^
    //     |         |
    //    end      start
    // where end - start + 1 = length
    // in this case start == 7, length == 11
    bigint = bigint.shrn(start - 1)
    var mask = new BN('1').shln(length)
    mask = mask.sub(new BN('1'))
    return bigint.and(mask)
}

export async function loadWeb3() {
    const provider = await detectEthereumProvider();
    console.log(provider);
    if (provider) {
      console.log("ethereum wallet is conencted");
      window.web3 = new Web3(provider);
    } else {
      console.log("ethereum wallet connection failed");
    }
    return provider
}

export async function getAccount(){
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0]
}

export async function getMarketContract(){
    const web3 = window.web3;
    const netid = await web3.eth.net.getId();
    const netdata = Market.networks[netid];
    if(netdata){
        const abi = Market.abi;
        const address = netdata.address;
        const contract = new web3.eth.Contract(abi, address);
        return contract
    }else{
        window.alert("Market contract load failed");
        return null
    }

}
export async function getCardContract(){
    const web3 = window.web3;
    const netid = await web3.eth.net.getId();
    const netdata = Card.networks[netid];
    if(netdata){
        const abi = Card.abi;
        const address = netdata.address;
        const contract = new web3.eth.Contract(abi, address);
        return contract
    }else{
        window.alert("Card contract load failed");
        return null
    }
}

export async function approve(account, nftContract, address, tokenId){
    const receipt = await nftContract.methods
        .approve(address, tokenId)
        .send({ from: account });
    console.log('approve receipt: ')
    console.log(receipt)
    return receipt
}

export async function listItem(account, marketContract, nftContract, tokenId, price, listingFee){
    const receipt = await marketContract.methods
        .createMarketItem(nftContract.address, tokenId, price)
        .send({ from: account, value: listingFee});
    console.log('createSell receipt: ')
    console.log(receipt)
    return receipt
}

export async function buyItem(account, marketContract, nftContract, itemId, priceWei){
    const receipt = await marketContract.methods
        .createMarketSale(nftContract.address, itemId)
        .send({ from: account, value: priceWei});
    console.log('buy receipt: ')
    console.log(receipt)  
}

export async function getListingPrice(marketContract){
    console.log('contract in glp:')
    console.log(marketContract)
    const price = await marketContract.methods
        .getListingPrice()
        .call();
    console.log('listing receipt: ')
    console.log(price)  
    return price
}

export async function getMarketItems(marketContract){
    const marketItems = await marketContract.methods
        .fetchMarketItems()
        .call();
    console.log('fetch market items receipt: ')
    console.log(marketItems)  
    return marketItems
}


