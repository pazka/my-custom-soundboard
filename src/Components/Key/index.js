import React from 'react';
import {addSound} from '../../Actions/soundActions';
import { connect } from 'react-redux';
import styled  from 'styled-components'

const Wrapper = styled.div`
    border : 1px solid white;
    background-color : lightgrey;

    margin : 1px;

    transition : all 0.7s;

    &.pressed {
        background-color : blue;
        transition : all .1s;
        color: white;
    }

    audio {
        width : 100%;
        display : none;
    }

    label{
        display: block;
        width : 10vw;
        height : 10vh;
        
        cursor : pointer;
    }

    input{
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

`

const mapStateToProps = (state) => ({...state.soundReducer})

const mapDispatchToProps = dispatch => ({
        addSound: (key,inputRef) => dispatch(addSound(key,inputRef))
   })

class KeyComponent extends React.Component{
    inputRef
    currentFile

    constructor(props){
        super(props)
        this.inputRef = React.createRef()
        this.currentFile = ''
    }

    componentDidMount() {
        this.handleChange = this.handleChange.bind(this)
        this.inputRef.current.addEventListener("change", this.handleChange );
    }

    render=()=>(
        <Wrapper className={'' + this.props.keyCode === this.props.playedKey ? 'pressed' : ''}>
            <label for={"file"+this.props.keyCode}>
                {this.props.keyCode + ' : ' + this.currentFile}
            </label>            
            <input type="file" id={"file"+this.props.keyCode} ref={this.inputRef}></input>
        </Wrapper>
    )

    
    handleChange = function() {
        this.currentFile = this.inputRef.current.files[0].name;

        if(this.inputRef.current.files[0])
            this.props.addSound(this.props.keyCode,this.inputRef.current)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyComponent);
//export default KeyComponent