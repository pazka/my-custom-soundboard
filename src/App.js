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
  logProps(){
    this.propsLog = JSON.stringify( this.props) 
  }

  render(){
    return (
      <Wrapper>
        {
          this.props.soundReducer.playedKeys.map(key =>(
            <KeyComponent key = {key} keyCode={key}>  </KeyComponent>
          ))
        }
        <SoundPlayer></SoundPlayer>
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps)(App);