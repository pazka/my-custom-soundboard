

import React from 'react'
import { connect } from 'react-redux';

import { playSound } from '../../Actions/soundActions';

const mapStateToProps = (state) => ({
  ...state.soundReducer
 })

 const mapDispatchToProps = dispatch => ({
    playSound: (keyCode) => dispatch(playSound(keyCode))
 })

 class SoundPlayer extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount () {
        this.playSoundComponent = this.playSoundComponent.bind(this)
        document.body.addEventListener('keypress', this.playSoundComponent);
    }

    keyCodePlayingIndex = {};

    playSoundComponent(key){
        if(this.props.allSounds.hasOwnProperty(key.code)){

            if(!this.keyCodePlayingIndex.hasOwnProperty(key.code))
                this.keyCodePlayingIndex[key.code] = 0

            this.props.allSounds[key.code].players[this.keyCodePlayingIndex[key.code]].play()

            this.keyCodePlayingIndex[key.code] = this.keyCodePlayingIndex[key.code] + 1 >= this.props.allSounds[key.code].players.length ? 0 : this.keyCodePlayingIndex[key.code] + 1
            console.log(this.keyCodePlayingIndex[key.code])
        }

        this.props.playSound(key.code);
    }

    render(){
        return <div>
            <h1 >Played : {this.props.playedKey}</h1>
            {Object.keys(this.keyCodePlayingIndex).map(key =>{
                return <p>{key} : {this.keyCodePlayingIndex[key]}</p>
            })}
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundPlayer);