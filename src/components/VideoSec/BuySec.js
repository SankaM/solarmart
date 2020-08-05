import React from "react";
import Aux from "../../hoc/Wrap";
import VideoS from "../Style/VideoSec.css";

const BuySec = (props) => {
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
          {/* <div>
            <label>Quatity</label>
            {"   "}
            <input type="text" id="quatity" />
          </div> */}
          <diV className="row mt-2">
            <div className={VideoS.buySecBtn} >
              <a id={VideoS.btnAddChart} href="#section">
                Add to Chart
              </a>
            </div>
            <div className={VideoS.buySecBtn}>
              <a id={VideoS.btnBuy} href="#section">
                Buy Now
              </a>
            </div>
          </diV>
        </div>
      </div>
    </Aux>
  );
};
export default BuySec;
