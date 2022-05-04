import CardRepo from './CardRepo'
import React, { Component } from 'react'
import GuestWelcome from './GuestWelcome'

export default class CardRepoCheckAccount extends Component {
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
          {this.state.userAcc? <CardRepo parentAcc={this.state.userAcc}/> : <GuestWelcome/>}
        </div>
      )
  }
}
