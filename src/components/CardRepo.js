import React, { Component } from 'react'
import {getMarketContract} from "./Utils"
import Card from "../abis/Card.json";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "./App.css";
import {loadWeb3, cardClass, sliceBNIntoArr } from "./Utils.js";
import characters from "../characters.json";
import CardDetail from './CardDetail';

const Web3Utils = require("web3-utils");
var BN = Web3Utils.BN;


export default class CardRepo extends Component {
    async componentDidMount() {
        this.state.total_chars = Object.keys(characters).length;
        await loadWeb3();
        await this.loadBlockchainData();
        await getMarketContract();
      }
    
      async loadCards() {
        const balance = await this.state.contract.methods
          .balanceOf(this.state.account)
          .call();
        this.setState({ balance: balance });
    
        for (let i = 0; i < balance; i++) {
          const cardId = await this.state.contract.methods
            .tokenOfOwnerByIndex(this.state.account, i)
            .call();
          const ability = await this.state.contract.methods
            .tokenIdToAbility(cardId)
            .call();
          const sub_attributes = await sliceBNIntoArr(new BN(ability.toString()));
    
          let current_card = new cardClass(cardId, sub_attributes, ability);
          this.setState({
            Cards: [...this.state.Cards, current_card],
          });

        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3;
        const netid = await web3.eth.net.getId();
        console.log(netid);
        const netdata = Card.networks[netid];
        if (netdata) {
          const abi = Card.abi;
          const address = netdata.address;
          const contract = new web3.eth.Contract(abi, address);
          this.setState({ contract: contract });
          this.loadCards();
        } else {
          window.alert("smart contract not deployed");
        }
      }
    
      async mint() {
        const receipt = await this.state.contract.methods
          .createCard("")
          .send({ from: this.state.account });
        this.addNew(receipt);
      }
    
      async addNew(receipt) {
        this.setState({Cards:[]})
      }
    
      constructor(props) {
        super(props);
        this.state = {
          account: this.props.parentAcc,
          contract: null,
          totalSupply: 0,
          Cards: [],
          blurState: false
        };
      }
    
      componentWillReceiveProps(nextProps) {
        this.setState({ account: nextProps.parentAcc });  
      }
    

      render(){
        return(
            <div className='container-filled'>
                {this.state.blurState ? <div class="blurBackground" /> : null}
                <div className='container-fluid mt-1'>
                    <hr></hr>
                        <div className='row textCenter'>
                            {this.state.Cards.map(card=>{
                                
                                return(
                                  <div >
                                        <div>
                                            <CardDetail open={card.show} cardInstance={card} onClose={
                                              () => {
                                                card.show = false
                                                this.setState({blurState:false})
                                                console.log(card.show)
                                                this.forceUpdate();
                                              }}/>
                                            <MDBCard className='token img' style={{maxWidth:'22rem'}} onClick={
                                              (event) =>{
                                                card.show = true;
                                                this.setState({blurState:true})
                                                this.forceUpdate();
                                              }        
                                            }>
                                            <MDBCardImage src={characters[(card.subAttributes[0] % this.state.total_chars)]['link']}  position='top' height='250rem' style={{marginRight:'4px'}} />
                                            <MDBCardBody>
                                            <div class="text-center">
                                            <MDBCardTitle> {characters[(card.subAttributes[0] % this.state.total_chars)]['name']} </MDBCardTitle> 
                                                <MDBCardText> Token Id:{card.tokenId.toString()}
                                                <br/> Skill 1:{card.subAttributes[1]}
                                                <br/> Skill 2:{card.subAttributes[2]}
                                                <br/> Skill 3:{card.subAttributes[3]}
                                                <br/> Skill 4:{card.subAttributes[4]}
                                                <br/> Skill 5:{card.subAttributes[5]}
                                                <br/> Skill 5:{card.subAttributes[6]}
                                                <br/> Skill 5:{card.subAttributes[7]}
                                                </MDBCardText>
                                            </div>

                                            {/* <MDBBtn href="huih">Download</MDBBtn> */}
                                            </MDBCardBody>
                                            </MDBCard>
                                        </div>
                                    </div>
                                )
                            })} 
                            <div >
                                <div>
                                    <MDBCard className='token img' style={{maxWidth:'22rem'}} onClick={(event)=>{
                                        event.preventDefault()
                                        this.mint("")
                                    }}>
                                    <MDBCardImage src={"https://gogogo.mypinata.cloud/ipfs/QmPGh6xHp4z92AYDomt9BzrqpNqYeezbkUP92PHd2rrdc8"}position='top' height='250rem' style={{marginRight:'4px'}} />
                                    <MDBCardBody>
                                    <MDBCardTitle class="text-center"> MINT </MDBCardTitle> 
                                        <MDBCardText>  
                                        {'No Card?You can mint a card by clicking me'}
                                        </MDBCardText>
                                    </MDBCardBody>
                                    </MDBCard>
                                </div>
                            </div>
                            <div >
                                <div>
                                    <MDBCard className='token img' style={{maxWidth:'22rem'}}>
                                    <MDBCardBody>
                                    <MDBCardTitle> Wanna a cooler card? You can trade cards with other players by clicking me!</MDBCardTitle> 
                                        <MDBCardText>  
                                        {/* {'You can trade cards with other players by clicking me'} */}
                                        </MDBCardText>
                                    {/* <MDBBtn href="huih">Mint</MDBBtn> */}
                                    </MDBCardBody>
                                    </MDBCard>
                                </div>
                            </div>
                        </div>                   
                </div>
            </div>
        )
    }
}
    
    