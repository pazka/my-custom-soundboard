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
    displayWarning;

    constructor(props){
        super(props)

        this.displayWarning = false;
    }

    componentDidMount() {
        //prepare the playsound event
        this.playSoundComponent = this.playSoundComponent.bind(this);
        this.bindMidiDevices = this.bindMidiDevices.bind(this);

        document.body.addEventListener('keypress', (key)=>{this.playSoundComponent(key.code)});

        //prepare Midi access
        if(navigator.requestMIDIAccess){
            navigator.requestMIDIAccess()
                .then(this.onMIDISuccess.bind(this), onMIDIFailure);
        }else{
            this.displayWarning = true
        }

        function onMIDIFailure() {
            alert('Could not access your MIDI devices.');
        }
    }

    onMIDISuccess(midiAccess) {
        this.bindMidiDevices(midiAccess)

        midiAccess.onstatechange = ()=>{
            this.bindMidiDevices(midiAccess)
        }
    }

    bindMidiDevices (midiAccess){
        console.log(midiAccess);

        var inputs = midiAccess.inputs;

        inputs.forEach(device => {
            console.log('Connecting to device', device);
            device.onmidimessage = this.playMidiSound.bind(this)
        })
    }

    playMidiSound = (m)=>{
        console.log(m)
        const [command, key, velocity] = m.data;

        //129 is key down
        if (command === 144 || command === 137) {
            this.playSoundComponent(m.currentTarget.name.split(' ')[0] + key)
        }
    }

    keyCodePlayingIndex = {};

    playSoundComponent(key) {
        if (this.props.allSounds.hasOwnProperty(key)) {

            if (!this.keyCodePlayingIndex.hasOwnProperty(key))
                this.keyCodePlayingIndex[key] = 0

            this.props.allSounds[key].players[this.keyCodePlayingIndex[key]].play()

            this.keyCodePlayingIndex[key] = this.keyCodePlayingIndex[key] + 1 >= this.props.allSounds[key].players.length ? 0 : this.keyCodePlayingIndex[key] + 1
            console.log(this.keyCodePlayingIndex[key])
        }

        this.props.playSound(key);
    }

    warningStyle = {
        display : "block",
        position : "absolute",
        top : "5px",
        right : "5px",
        padding : "5px",
        backgroundColor : "lightcoral"
    }

    render() {
        return !this.displayWarning ? "" : (<p style={this.warningStyle}> You can't use a midi device on a not secure site, please use the <a href={window.location.href.replace('http://','https://')}>secure site (https://)</a> </p>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundPlayer);