import React,{useEffect, useState } from "react";
import Select from 'react-select';

import "./CardDetail.css";
import characters from "../characters.json";
import {sliceBNIntoArr} from "./Utils"
import { cardClass} from "./Utils";
import settings from '../settings.json'
const Web3Utils = require('web3-utils');
var BN = Web3Utils.BN;

function CardDeckRegister({open, onClose, parentCardContract, parentAcc}) {
    if(!open) return null
    const total_chars = Object.keys(characters).length;
    const [cards, setCards] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]); 

    useEffect(() => {
      const fetchData = async() => {
            await cardsToOptions();
        }
        fetchData()
    }, []);

    async function loadCards() {
      let res = []
      const balanceTemp = await parentCardContract.methods
        .balanceOf(parentAcc)
        .call();
        
        for (let i = 0; i < balanceTemp; i++) {
          const cardId = await parentCardContract.methods
            .tokenOfOwnerByIndex(parentAcc, i)
            .call();
          const ability = await parentCardContract.methods
            .tokenIdToAbility(cardId)
            .call();
          const sub_attributes = await sliceBNIntoArr(new BN(ability.toString()));
  
        let currentCard = new cardClass(cardId, sub_attributes, ability);
        setCards([...cards, currentCard]);
        res = [...res, currentCard];
      }
      return res;
    }
    
    async function builDeck(){
      const rawJson = {
        "uid" : parentAcc,
        "deck" : selectedOption
      }
      const jsonData = JSON.stringify(rawJson);
      console.log(jsonData);

      await fetch(settings['STORE_DECK_URL'], 
        {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json charset=UTF-8'
          },
          body: jsonData
        }).then(function(response){
        console.log(response)
      }).then(function(data){
        console.log(data)
      })
    }
    
    async function cardsToOptions(){
      let res = []
      const cards = await loadCards();
      console.log('cards: ' + cards);
      for(const currentCard of cards){
        let currentString = "🃏"
        currentString = currentString + 
          characters[(currentCard.subAttributes[0] % total_chars)]['name']+
          " (Id: "+
          currentCard.tokenId+
          ")";
        const currentOption = {value: currentCard.subAttributes, label: currentString};
        res = [...res, currentOption];
    }

    setOptions(res);
    return res;
  }


  return (
    <div className='overlay'>
        <div className='modalContainer'>
            {/* <img src={'https://gogogo.mypinata.cloud/ipfs/QmNS8u5mNF3HgzxoT5jyCEMjTFcGoRSKxQPZBn1D3KFLXH/%E6%8D%95%E8%8E%B72.PNG'} alt=''/> */}
            <div className='modalRight'>
                <div className='content'>
                    <h1>Build a Deck</h1>
                    <div class="text-left">
                        Build a Deck
                    </div>
                </div>
                  <div className="selectContainer">
                    <Select
                        isMulti={true}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                  </div>
                <div className='btnContainer'>
                  <button className='btnPrimary' onClick={()=>{
                      builDeck();
                  }}>
                        <span className='sell'>Build</span>
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

export default CardDeckRegister