import React, { Component } from 'react';
import {Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {connect} from 'react-redux';
import Aux from '../../hoc/Wrap';
import * as snakAct from '../../store/actions/indexAcc';

class CustomSnakbar extends Component{
    snakHandleClose=(event,reason)=>{
        if(reason==="clickaway"){
            return;
        }
        this.props.setSnakBar(false,this.props.snakbarType,this.props.snakbarMessage)
    }
    render(){
        return(
            <Aux>
                <Snackbar
                    open={this.props.snakbarOpen}
                    autoHideDuration={3000}
                    onClose={this.snakHandleClose}
                >
                    <Alert 
                        elevation={6}
                        variant="filled"
                        onClose={this.snakHandleClose}
                        color={this.props.snakbarType}
                    >
                        {this.props.snakbarMessage}
                    </Alert>
                </Snackbar>
            </Aux>
        );
    } 
}
const mapStateToProps=(state)=>{
    return{
        snakbarType:state.sbr.snakbarType,
        snakbarOpen:state.sbr.snakbarOpen,
        snakbarMessage:state.sbr.snakbarMessage,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        setSnakBar : (snakbarOpen,snakbarType,snakbarMessage)=>dispatch(snakAct.setSankBar(snakbarOpen,snakbarType,snakbarMessage))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomSnakbar);