import React, { Component } from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import GameCheckAccount from './GameCheckAccount'
import MarketplaceCheckAccount from './MarketplaceCheckAccount'
import MetaMaskAuth from './metamask-auth'
import CardRepoCheckAccount from './CardRepoCheckAccount'

export default class 
 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAcc: null
    };
  }

  handleCallback = (childData) =>{
    this.setState({userAcc: childData})
  }

  render() {
    return (
      <Router>
        <div className='bar'>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">NFT Metaverse Card</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
              <Nav.Link as={Link} to={"/"}>Card Repository</Nav.Link>
              <Nav.Link as={Link} to={"/Marketplace"}>Marketplace</Nav.Link>
              <Nav.Link as={Link} to={"/Game"}>Game</Nav.Link>
              <MetaMaskAuth onAddressChanged={this.handleCallback}/>
              </Nav>
          </Navbar.Collapse>
          </Navbar>
          <div>
            <switch>
              <Route path="/Game"><GameCheckAccount parentAcc={this.state.userAcc}/></Route>
              <Route path="/Marketplace"><MarketplaceCheckAccount parentAcc={this.state.userAcc}/></Route>
              <Route exact path="/"><CardRepoCheckAccount parentAcc={this.state.userAcc}/></Route>
            </switch>
          </div>
        </div>
      </Router>
    )
  }
}
