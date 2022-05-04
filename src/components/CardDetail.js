import React,{useEffect, useState } from "react";
import "./CardDetail.css";
import characters from "../characters.json";
import {getAccount, approve, listItem, getListingPrice, getMarketContract, getCardContract, isNumeric} from "./Utils"
import Input from "./ForeignComponents/Input.js"

function CardDetail({open, onClose, cardInstance, parentAcc}) {
    if(!open) return null
    const total_chars = Object.keys(characters).length;
    const [marketc, setMarketc] = useState(null);
    const [cardc, setCardc] = useState(null); 
    const [lisp, setLisp] = useState("0");
    const [val, setVal] = useState("");


    useEffect(() => {
        const fetchData = async() => {
            const mc = await getMarketContract()
            const cc = await getCardContract()
            const lp = await getListingPrice(mc)
            let ether = await window.web3.utils.fromWei(lp.toString(), 'ether')
            setMarketc(mc)
            setCardc(cc)
            setLisp(ether)
        }
        fetchData()
    }, []);

    function HandleChanging(v){
        setVal(v)
    }

    async function HandleApproval(){
        const acc = await getAccount();
        await approve(acc, cardc, marketc.address, cardInstance.tokenId);
    }

    async function HandleListing(){
        if(!isNumeric(val)){
            alert("The selling price of your card must be numeric.");
            return
        }
        const acc = await getAccount();
        const weiPrice = await window.web3.utils.toWei(val)
        const listingFee = await window.web3.utils.toWei(lisp)
        await listItem(acc, marketc, cardc, cardInstance.tokenId, weiPrice, listingFee);

    }


  return (
    <div className='overlay'>
        <div className='modalContainer'>
            {/* <img src={'https://gogogo.mypinata.cloud/ipfs/QmNS8u5mNF3HgzxoT5jyCEMjTFcGoRSKxQPZBn1D3KFLXH/%E6%8D%95%E8%8E%B72.PNG'} alt=''/> */}
            <div className='modalRight'>
                <div className='content'>
                    <h1>{characters[(cardInstance.subAttributes[0] % total_chars)]['name']}</h1>
                    <p>Skill 1</p>
                    <p>Skill 2</p>

                    <div class="text-left">
                        To list the NFT Card in the decentralized marketplace, authorize the marketplace to list your chosen NFT Card first.
                        By clicking approve, you authorize the market contract to transfer the ownership of the NFT Card to it.
                        Then input your offered price to following textfield and click list to list it. 
                        The market contract would charge you an extra listing fee and send it to the market contract owner.
                    </div>
                    <b class="text-right">listing price: {lisp.toString()} ether</b>
                </div>
                <div class='textContainer'>
                    <Input value={val} callback={HandleChanging}/>
                    {/* <input class="text" type="text" onChange={HandleChanging}  /> */}
                </div>
                <div className='btnContainer'>
                    <button className='btnPrimary' onClick={()=>HandleApproval()}>
                        <span className='sell'>Approve</span>
                    </button>
                    <button className='btnPrimary' onClick={()=>HandleListing()}>
                        <span className='sell'>List</span>
                    </button>
                    <button className='btnOutline' onClick={(onClose)}>
                        <span className='bold'>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardDetail