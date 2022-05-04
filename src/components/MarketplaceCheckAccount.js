import Marketplace from './Marketplace';
import React, { Component } from 'react'
import GuestWelcome from './GuestWelcome'

export default class MarketpalceCheckAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            userAcc: this.props.parentAcc
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ userAcc: nextProps.parentAcc });  
    }
  render() {
      return(
        <div>
          {this.state.userAcc? <Marketplace parentAcc={this.state.userAcc}/> : <GuestWelcome/>}
        </div>
      )
  }
}
