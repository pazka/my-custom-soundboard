import React from 'react'
import './App.css';
import { connect } from 'react-redux';

import KeyComponent from './Components/Key'
import SoundPlayer from './Components/Sounds'

import styled from 'styled-components'

const Wrapper = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%;

`

const mapStateToProps = (state) => ({
  ...state
 })

class App extends React.Component {
  constructor(props){
    super(props)
    document.title = "Custom Sounboard"
  }

  logProps(){
    this.propsLog = JSON.stringify( this.props) 
  }

  render(){
    return (
      <div>
        
      <div><h1>Custom Soundboard</h1><p>Press any key from your keyboard or midi instrument and you'll be able to assign a sound to this key.</p></div>
      
      <SoundPlayer></SoundPlayer>
      <Wrapper>
       
        {
          this.props.soundReducer.playedKeys.map(key =>(
            <KeyComponent key = {key} keyCode={key}>  </KeyComponent>
          ))
        }
      </Wrapper>
      </div> 
    );
  }
}

export default connect(mapStateToProps)(App);