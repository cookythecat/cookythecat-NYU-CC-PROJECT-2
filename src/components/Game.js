import React, { Component } from 'react'

export default class Game extends Component {
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
  render() {
    return (
      <div>
          <h1>test</h1>
      </div>
    )
  }
}
