import React,{Component} from 'react';  
import pstayle from "../Style/Pdetails.css";
import Aux from '../../hoc/Wrap';

class ProductDetails extends Component{
    render(){
        return(
            <Aux>
                <div className={pstayle.pcontainer}>
                    <h3 className="m-4 pt-3">Pruduct details</h3>
                    <p className="p-3">
                        "This happens due to “React” import necessary in JSX file. The React library must also always be in scope from JSX code because JSX compiles as a reac in your case React must be import in Menu.js,The book says setting window.React to React expose the React library globally in the browser. This way all calls to React.createElement are assured to work. But it seems like I still need to put import React from 'react';on each file that use JSX."
                    </p>
                </div>
            </Aux>          
        )
    }
}
export default ProductDetails;