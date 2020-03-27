import React,{Component} from 'react';
import Aux from '../hoc/Wrap';
import Card from '../components/Card/card';
import Cstyle from '../components/Style/container.css'
import {Link} from 'react-router-dom';

class relatedItem extends Component{
    render(){
        return(
            <Aux>
                <div className="row mt-1">
                    <h3 className="ml-5">Related Product</h3>
                    <div className={Cstyle.rProductContainer}>
                        <Link to="/Item"><Card/></Link>                
                        <Link to="/Item"><Card/></Link>                
                        <Link to="/Item"><Card/></Link>                         
                        <Link to="/Item"><Card/></Link>                         
                        <Link to="/Item"><Card/></Link>                         
                    </div>
                </div>
            </Aux>
        );
    }
}
export default relatedItem;