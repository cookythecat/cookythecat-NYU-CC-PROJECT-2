import React,{useEffect, useState } from "react";
import "./CardDetail.css";
import characters from "../characters.json";
import {buyItem, getAccount, getMarketContract, getCardContract} from "./Utils"


function MarketCArdDetail({open, onClose, cardInstance}) {
    if(!open) return null
    const total_chars = Object.keys(characters).length;
    const [marketc, setMarketc] = useState(null);
    const [cardc, setCardc] = useState(null); 


    useEffect(() => {
        const fetchData = async() => {
            const mc = await getMarketContract()
            const cc = await getCardContract()
            setMarketc(mc)
            setCardc(cc)
        }
        fetchData()
    }, []);

    async function HandleCicking(){
        const userAccount = await getAccount();
        await buyItem(userAccount, marketc, cardc, cardInstance.itemId, cardInstance.price);
    }


  return (
    <div className='overlay'>
        <div className='modalContainer'>
            <div className='modalRight'>
                <div className='content'>
                    <h1>{characters[(cardInstance.subAttributes[0] % total_chars)]['name']}</h1>
                    <p>Skill 1</p>
                    <p>Skill 2</p>
                    <b>seller offered price: {window.web3.utils.fromWei(cardInstance.price.toString(), 'ether')} ether</b>
                </div>
                <div className='btnContainer'>
                    <button className='btnPrimary' onClick={()=>HandleCicking()}>
                        <span className='sell'>Buy</span>
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

export default MarketCArdDetail