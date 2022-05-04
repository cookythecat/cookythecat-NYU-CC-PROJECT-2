import React, { Component } from 'react'
import './GuestWelcome.css'
import StarfieldAnimation from 'react-starfield-animation'

export default class GuestWelcome extends Component {
  render() {
    return (
        <div class = 'gcontainer'>

          <StarfieldAnimation
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}/>
            {/* <figure>
                <img src={'https://gogogo.mypinata.cloud/ipfs/QmTJuiYyrQtC5XiWXK67aZgRjrJqCtXeuTa7mPMTr9xjtT'}/>
                <figcaption class="text-center"> Welcome to NFT Card Game </figcaption>
            </figure> */}

            <div class="img-with-text">
                <img src={'https://gogogo.mypinata.cloud/ipfs/QmTJuiYyrQtC5XiWXK67aZgRjrJqCtXeuTa7mPMTr9xjtT'} alt="sometext" />
                <h1>Discover,</h1>
                <h1>mint, </h1>
                <h1>and trade NFT Cards.</h1>
                <h1>Play battle against</h1>
                <h1>other players.</h1>
            </div>

        </div>
    )
  }
}
