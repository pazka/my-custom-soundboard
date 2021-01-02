import React from 'react'
import './App.css';
import { connect } from 'react-redux';

import { simpleAction } from './Actions/simpleAction';

import KeyComponent from './Components/Key'
import SoundPlayer from './Components/Sounds'

const mapStateToProps = (state) => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  simpleActionEvent = (event) => {
    this.props.simpleAction();
  } 

  render(){
    return (
      <div>
        <KeyComponent keyCode="KeyQ" />
        <KeyComponent keyCode="KeyW" />
        <KeyComponent keyCode="KeyE" />
        <KeyComponent keyCode="KeyR" />
        <SoundPlayer></SoundPlayer>
        <pre>
        </pre>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);