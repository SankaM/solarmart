import React,{Component} from 'react';
import Aux from '../hoc/Wrap';
import Card from '../components/Card/card';
import Cstyle from '../components/Style/container.css';
import {Link} from 'react-router-dom';

class FeturedItem extends Component{
    render(){
        return(
            <Aux>
                <div className={Cstyle.FcardContainer}>
                    <h4>Fetuerd Item</h4>
                    <Link to="/Item"><Card/></Link>
                    <Link to="/Item"><Card/></Link>
                    <Link to="/Item"><Card/></Link>
                    <Link to="/Item"><Card/></Link>
                </div>
            </Aux>
        );
    }
}
export default FeturedItem;