import React,{useEffect} from "react";

import "./CardDetail.css";

function GameBattle({open, onClose, parentCardContract, parentAcc}) {
    if(!open) return null

    useEffect(() => {
      const fetchData = async() => {

        }
        fetchData()
    }, []);
    

  return (
    <div className='overlay'>
        <div className='modalContainer'>
            <div className='modalRight'>
                <div className='content'>
                    <h1>Battle</h1>
                    <div class="text-left">
                        battle
                    </div>
                </div>
                  <div className="selectContainer">
                  </div>
                <div className='btnContainer'>
                  <button className='btnPrimary' onClick={()=>{
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