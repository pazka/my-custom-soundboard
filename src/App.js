import React from 'react'
import './App.css';
import { connect } from 'react-redux';

import KeyComponent from './Components/Key'
import SoundPlayer from './Components/Sounds'

const mapStateToProps = (state) => ({
  ...state.soundReducer
 })

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
      <div>
      {console.log(this.props)}
        {
          this.props.playedKeys.map(key =>{
            <KeyComponent keyCode={key}>  </KeyComponent>
          })
        }
        <SoundPlayer></SoundPlayer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);