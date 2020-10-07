import React,{useState} from "react";
import Aux from "../../hoc/Wrap";
import VideoS from "../Style/VideoSec.css";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../store/actions/indexAcc";

import { useSelector, useDispatch } from "react-redux";

const BuySec = (props) => {
  const IsuserExits = useSelector((state) => state.lor.userLogin);
  const [quatity,setQuatity] = useState(1);
  const dispatch = useDispatch();

  const QuatityHandler=(e)=>{
    setQuatity(e.target.value)
  }
  const checkOut = () => {
    const order = [
      {
        Img: props.MImg,
        brand: props.product.ProBrand,
        id: props.product.ProId,
        model: props.product.ProModel,
        price: props.product.Act_SellPrice,
        quentity: quatity,
      },
    ];
    const orderTotal = props.product.Act_SellPrice * quatity + 219;
    localStorage.setItem("orderDetails", JSON.stringify(order));
    localStorage.setItem("orderTotal", orderTotal);
  };
  return (
    <Aux>
      <div className={VideoS.vContainer}>
        <div id={VideoS.vsec}>
          <div className="row">
            <div className="col-6">
              {props.product.FeatureOne && (
                <span className={VideoS.features}>
                  * {props.product.FeatureOne}
                </span>
              )}
              {props.product.FeatureTwo && (
                <span className={VideoS.features}>
                  * {props.product.FeatureTwo}
                </span>
              )}
              {props.product.FeatureThree && (
                <span className={VideoS.features}>
                  * {props.product.FeatureThree}
                </span>
              )}
            </div>
            <div className="col-6">
              {props.product.FeatureFour && (
                <span className={VideoS.features}>
                  * {props.product.FeatureFour}
                </span>
              )}
              {props.product.FeatureFive && (
                <span className={VideoS.features}>
                  * {props.product.FeatureFive}
                </span>
              )}
              {props.product.FeatureSix && (
                <span className={VideoS.features}>
                  * {props.product.FeatureSix}
                </span>
              )}
            </div>
          </div>
          <div className={VideoS.pricSec}>
            <span className={VideoS.newPrice}>
              Rs : {props.product.Act_SellPrice} /=
            </span>
            {props.product.discount && (
              <span className={VideoS.pastPrice}>
                <del> Rs : {props.product.SellPrice} </del>
              </span>
            )}
            {props.product.discount && (
              <span className={VideoS.pastPrice}>
                (- {props.product.discount} %)
              </span>
            )}
          </div>
          <div className={["row",VideoS.qutiSec].join(' ')}>
            <span className={VideoS.qutitySpan}>Quantity</span>
            <NativeSelect
              id="select"
              defaultValue="1"
              onChange={(e) => {
                QuatityHandler(e)
              }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
            </NativeSelect>
          </div>
          <div className="row mt-2">
            <div className={VideoS.buySecBtn}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  dispatch(addItemToCart(IsuserExits, props.product.ProId))
                }
              >
                Add to cart
              </Button>
            </div>
            <div className={VideoS.buySecBtn}>
              <Button
                component={Link}
                to="/checkout"
                onClick={() => checkOut()}
                variant="outlined"
                color="secondary"
              >
                Buy it Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};
export default BuySec;
