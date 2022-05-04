import Game from './Game';
import React, { Component } from 'react'
import GuestWelcome from './GuestWelcome'

export default class GameCheckAccount extends Component {
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
          {this.state.userAcc? <Game parentAcc={this.state.userAcc}/> : <GuestWelcome/>}
        </div>
      )
  }
}
