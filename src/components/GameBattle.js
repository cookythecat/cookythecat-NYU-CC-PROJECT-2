import React,{useEffect, useState} from "react";
import Select from 'react-select';

import "./CardDetail.css";
import settings from '../settings.json'
import axiosRetry from 'axios-retry';
const axios = require('axios').default;

function GameBattle({open, onClose, parentCardContract, parentAcc}) {
    if(!open) return null
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]); 
    const [boxTexts, setBoxTexts] = useState("");
    let strTempStorage = ""

    useEffect(() => {
      const fetchData = async() => {
          await queryDecks();
        }
        fetchData()
    }, []);

    async function queryDecks(){
      let res = []
      let json_res = await fetch(settings['GET_DECK_URL'],
        {
          method: 'GET',
          headers: {
            'uid' : parentAcc
          }
        }
      ).then(response => {
        if (!response.ok) {
            return response.json()
                .catch(() => {
                    // Couldn't parse the JSON
                    throw new Error(response.status);
                })
                .then(({message}) => {
                    // Got valid JSON with error response, use it
                    throw new Error(message || response.status);
                });
          }
          // Successful response, parse the JSON and return the data
          return response.json();
      });
      for(const deck of json_res){
        let replacedDeck = deck.replace(/'/g, '"')
        let deckObj = JSON.parse(replacedDeck)
        let deckStr = ""
        for(const card of deckObj){
          deckStr += card['label'] + " "
        }
        res = [...res, {
          label: deckStr,
          value: deck
        }]
      }
      console.log(res)
      setOptions(res);
    }

    function attendBattle(){
      if(options.length == 0) return;

        let jsonData = selectedOption['value']
        let headers = {
          'Content-Type' : 'application/json charset=UTF-8',
          'uid' : parentAcc
        }
        let replacedDeck = jsonData.replace(/'/g, '"')
        console.log("***" + replacedDeck)
        let deckObj = JSON.parse(replacedDeck)
        strTempStorage += " start to connect remote game server...\n"
        setBoxTexts( strTempStorage)

        axiosRetry(axios, {
          retries: 60, // number of retries
          retryDelay: (retryCount) => {
            strTempStorage += " waiting for another player...\n"
            setBoxTexts( strTempStorage)
            return 2000; // time interval between retries
          },
          retryCondition: (error) => {
            return error.response.status === 503;
          },
        });
        axios({
          method: "post",
          url: settings['BATTLE_URL'],
          data: deckObj,
          headers: headers,
        }).then((res) => {
          strTempStorage += " battle result is fetched successfully...\n"
          setBoxTexts(strTempStorage)
          let jsonData = res.data
          let replacedJsonData = jsonData.replace(/'/g, '"')
          let battleRes = JSON.parse(replacedJsonData)
          strTempStorage += battleRes['result']
          setBoxTexts(strTempStorage)
          console.log('Response is *****', res);
        }).catch((err) => {
          console.log('Error occurred' + err);
        });

    }
    

  return (
    <div className='overlay'>
        <div className='modalContainer'>
            <div className='modalRight'>
                <div className='content'>
                    <h1>Battle</h1>
                </div>

                <textarea className="textAreaContainer" value={boxTexts}></textarea>
                <div className="selectContainer">
                    <Select
                        isMulti={false}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                </div>
                <div className='btnContainer'>
                  <button className='btnPrimary' onClick={()=>{
                    attendBattle();
                  }}>
                      <span className='sell'>Battle</span>
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

export default GameBattle