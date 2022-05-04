import React, { Component } from 'react'
import {sliceBNIntoArr, marketCard, loadWeb3, getMarketItems, getMarketContract, getCardContract} from "./Utils"
import characters from "../characters.json";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import MarketCardDetail from './MarketCardDetail';

const Web3Utils = require("web3-utils");
var BN = Web3Utils.BN;

export default class Marketplace extends Component {
  async componentDidMount() {
    this.state.total_chars = Object.keys(characters).length;
    await loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const marketContract = await getMarketContract()
    const cardContract = await getCardContract()
    const items = await getMarketItems(marketContract)
    this.setState({marketContract : marketContract})
    this.setState({cardContract : cardContract})
    await this.loadMarketCards(items)
    console.log(items)
    return null;
  }
  
  async loadMarketCards(items){
    for (const element of items){
      const ability = await this.state.cardContract.methods
      .tokenIdToAbility(element[2])
      .call();
      const sub_attributes = await sliceBNIntoArr(new BN(ability.toString()));
      const current_card = new marketCard(element[0], element[1], element[2], element[3], element[4], element[5], element[6], sub_attributes)
      
      this.setState({
        Cards: [...this.state.Cards, current_card],
      })
    };
    return null
  }

  constructor(props) {
    super(props);
    this.state = {
      account: this.props.parentAcc,
      cardContract: null,
      marketContract: null,
      Cards: [],
      blurState: false
    };
  }

  
  componentWillReceiveProps(nextProps) {
    this.setState({ userAcc: nextProps.parentAcc });  
  }

  render() {
    return (
      <div className='container-filled'>
      {this.state.blurState ? <div class="blurBackground" /> : null}
      <div className='container-fluid mt-1'>
      <div className='row textCenter'>
        {this.state.Cards.map(card=>{
          return(
            <div>
                <div>
                    <MarketCardDetail open={card.show} cardInstance={card} onClose={
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
                    <MDBCardTitle> {characters[(card.subAttributes[0] % this.state.total_chars)]['name']} </MDBCardTitle> 
                        <MDBCardText> Token Id:{card.tokenId.toString()}</MDBCardText>
                        <MDBCardText> Skill 1:{card.subAttributes[1]}</MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
                </div>
              </div>
          )
        })}         
        </div>
        </div>
      </div>
    )
  }
}
