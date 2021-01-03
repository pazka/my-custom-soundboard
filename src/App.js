import React from 'react'
import './App.css';
import { connect } from 'react-redux';

import KeyComponent from './Components/Key'
import SoundPlayer from './Components/Sounds'

const mapStateToProps = (state) => ({
  ...state
 })

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  logProps(){
    this.propsLog = JSON.stringify( this.props) 
  }

  render(){
    return (
      <div>
        {
          this.props.soundReducer.playedKeys.map(key =>(
            <KeyComponent key = {key} keyCode={key}>  </KeyComponent>
          ))
        }
        <SoundPlayer></SoundPlayer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);