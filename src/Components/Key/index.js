import React from 'react';
import {addSound} from '../../Actions/soundActions';
import { connect } from 'react-redux';
import styled  from 'styled-components'

const Wrapper = styled.div`
    border : 1px solid black;
    transition : all 0.s;
    width : 4rem;
    height : auto;
    background-color : ${props => (props.color)} ;
    display : flex;
    flex-direction : column;

    &.pressed {
        background-color : blue
    }

    p{
        width : 100%;
        line-height: 0.01em;
        font-size : 2rem;
    }

    audio {
        width : 100%;
        display : none;
    }

`

const mapStateToProps = (state) => ({...state.soundReducer})

const mapDispatchToProps = dispatch => ({
        addSound: (key,audioRef) => dispatch(addSound(key,audioRef))
   })

class KeyComponent extends React.Component{

    constructor(props){
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        this.handleChange = this.handleChange.bind(this)
        this.inputRef.current.addEventListener("change", this.handleChange );
    }

    render=()=>(
        <Wrapper className={'' + this.props.keyCode === this.props.playedKey ? 'pressed' : ''}>
            <p>{this.props.keyCode}</p>
            
            <input type="file" ref={this.inputRef}></input>
        </Wrapper>
    )

    
    handleChange = function() {
        if(this.inputRef.current.files[0])
            this.props.addSound(this.props.keyCode,this.inputRef.current)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyComponent);
//export default KeyComponent