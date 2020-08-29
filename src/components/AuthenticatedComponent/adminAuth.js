import React, { Component } from 'react';
import {getJwt} from '../../Helpers/Jwt';
import {withRouter} from 'react-router-dom';

class adminAuth extends Component {
    constructor(props){
        super(props);
        this.state = {
            admin:undefined
        }
    }
    componentDidMount(){
        const jwt = getJwt();
        if(!jwt){
            this.props.history.push('/Login');
        }
        this.setState({
            user:jwt
        })
    }
    render() {
        if(this.state.admin === undefined){
            return(
                <div><h1>Loading...</h1></div>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default withRouter(adminAuth)