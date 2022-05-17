import React, { Component } from 'react'
import "./App.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import GameDeckrRegister from "./GameDeckRegister";
import {loadWeb3, getCardContract} from "./Utils"
import GameBattle from './GameBattle';

export default class Game extends Component {
  async componentDidMount() {
    await loadWeb3();
    const cc = await getCardContract();
    this.setState({cardContract: cc})
  }

  constructor(props) {
    super(props);
    this.state = {
      account: this.props.parentAcc,
      cardContract: null,
      marketContract: null,
      Cards: [],
      showBuild: false,
      showBattle: false,
      blurState: false
    };
  }

  render() {
    return (
      <div className='container-filled'>
          {this.state.blurState ? <div class="blurBackground" /> : null}
          <div className='container-fluid mt-1'>
          <GameDeckrRegister open = {this.state.showBuild} parentCardContract = {this.state.cardContract}
            parentAcc = {this.state.account} onClose={
              () => {
                this.setState({showBuild: false});
                this.setState({blurState: false});
                this.forceUpdate();
              }
            }
          />
          <GameBattle open = {this.state.showBattle} parentCardContract = {this.state.cardContract}
            parentAcc = {this.state.account} onClose={
              () => {
                this.setState({showBattle: false});
                this.setState({blurState: false});
                this.forceUpdate();
              }
            }
          />
            <div className='row textCenter'>
                <div>
                  <MDBCard className='token img' style={{maxWidth:'22rem'}} onClick={(event)=>{
                    event.preventDefault()
                    this.setState({showBuild: true});
                    this.setState({blurState: true});
                    this.forceUpdate();
                  }}>
                  <MDBCardImage src={"https://gogogo.mypinata.cloud/ipfs/QmNadzunSQuWWMtmLmSWhXAQE4624n6pgpcmeL59aH9eDD"}position='top' height='250rem' style={{marginRight:'4px'}} />
                  <MDBCardBody>
                  <MDBCardTitle class="text-center"> Build a Deck </MDBCardTitle> 
                  <MDBCardText> Build a Deck </MDBCardText>
                  </MDBCardBody>
                  </MDBCard>
                </div>
                <div>
                  <MDBCard className='token img' style={{maxWidth:'22rem'}} onClick={(event)=>{
                    event.preventDefault()
                    this.setState({showBattle: true});
                    this.setState({blurState: true});
                    this.forceUpdate();
                  }}>
                  <MDBCardImage src={"https://gogogo.mypinata.cloud/ipfs/QmW8wo3uopdJy1U2g4yRF6EzNzpdxHuw9zqhzcLbWXnXpb"}position='top' height='250rem' style={{marginRight:'4px'}} />
                  <MDBCardBody>
                  <MDBCardTitle class="text-center"> Battle </MDBCardTitle> 
                  <MDBCardText> Play battle against other players </MDBCardText>
                  </MDBCardBody>
                  </MDBCard>
                </div>
            </div> 
          </div>
      </div>
    )
  }
}
