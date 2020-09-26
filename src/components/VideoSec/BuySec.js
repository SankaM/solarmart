import React from "react";
import Aux from "../../hoc/Wrap";
import VideoS from "../Style/VideoSec.css";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {addItemToCart} from '../../store/actions/indexAcc';

import {useSelector,useDispatch} from "react-redux"

const BuySec = (props) => {

  const IsuserExits = useSelector((state)=>state.lor.userLogin);
  const dispatch = useDispatch() 
  const checkOut=()=>{
    const order=[{
      Img: props.MImg,
      brand: props.product.ProBrand,
      id: props.product.ProId,
      model: props.product.ProModel,
      price: props.product.SellPrice,
      quentity: 1,
    }]
    const orderTotal = props.product.SellPrice + 219;
    localStorage.setItem("orderDetails",JSON.stringify(order));
    localStorage.setItem("orderTotal",orderTotal);
  }
  return (
    <Aux>
      <div className={VideoS.vContainer}>
        <div id={VideoS.vsec}>
        <h4 className={VideoS.keyFhader}>Special features</h4>
          <div className="row">
            <div className="col-6">
              <ul className={VideoS.key6F}>
                <li>{props.product.FeatureOne}</li>
                <li>{props.product.FeatureTwo}</li>
                <li>{props.product.FeatureThree}</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className={VideoS.key6F}>
                <li>{props.product.FeatureFour}</li>
                <li>{props.product.FeatureFive}</li>
                <li>{props.product.FeatureSix}</li>
              </ul>
            </div>
          </div>
          <div className="mt-1">
            <span className={VideoS.newPrice}>
              Rs : {props.product.SellPrice}
            </span>
            <span className={VideoS.pastPrice}></span>
          </div>
          <div className="row mt-2">
            <div className={VideoS.buySecBtn} >
              <Button variant="outlined" color="primary" onClick={()=>dispatch(addItemToCart(IsuserExits,props.product.ProId))}>Add to cart</Button>
            </div>
            <div className={VideoS.buySecBtn}>
              <Button component={Link} to="/checkout" onClick={()=>checkOut()} variant="outlined" color="secondary">Buy it Now</Button>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};
export default BuySec;
