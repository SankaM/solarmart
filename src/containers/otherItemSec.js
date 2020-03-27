import React,{Component} from 'react';
import Aux from '../hoc/Wrap';
import Card from '../components/Card/card';
import Cstyle from '../components/Style/container.css'
import {Link} from 'react-router-dom';

class otherItemSec extends Component{
    render(){
        return(
            <Aux>
                <div className={Cstyle.otherItemSec}>
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                    <Link to="/Item"><Card/></Link>                
                </div>
            </Aux>
        );
    }
}
export default otherItemSec;