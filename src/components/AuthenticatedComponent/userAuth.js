import React, { Component } from 'react';
//import {getUserToken} from '../../Helpers/Jwt';
import Aux from '../../hoc/Wrap';

import {connect} from 'react-redux';

class userAuth extends Component {
    state = {  }
    render() { 
        let action = null;
        this.props.isUserExits?
            action = <h1>Fuck you</h1>:
            action=<Aux>{this.props.childern}</Aux>

        return ( 
            <Aux>
                {action}
            </Aux>
         );
    }
}
 
const mapStateToProps=(state)=>{
return{
    isUserExits:state.userLogin
}
}

export default connect(mapStateToProps)(userAuth);