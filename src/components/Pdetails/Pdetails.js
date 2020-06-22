import React from 'react';  
import pstayle from "../Style/Pdetails.css";
import Aux from '../../hoc/Wrap';

const  ProductDetails =(props) =>{
        return(
            <Aux>
                <div className={pstayle.pcontainer}>
                    <h3 className="m-4 pt-3">Pruduct details</h3>
                    <p className="p-3">
                        {props.proDetails}
                    </p>
                </div>
            </Aux>          
        )
}
export default ProductDetails;