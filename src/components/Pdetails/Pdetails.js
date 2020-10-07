import React from "react";
import pstayle from "../Style/Pdetails.css";
import Aux from "../../hoc/Wrap";
import { Table } from "react-bootstrap";

const ProductDetails = (props) => {
  return (
    <Aux>
      <div className={pstayle.pcontainer}>
        <h3 className={pstayle.pdetailsHead}>
          product details of {props.proDetails.ProBrand}{" "}
          {props.proDetails.ProModel} {props.proDetails.productname}
        </h3>
        <div className={["row",pstayle.pdetcontainer].join(' ')}>
          <div className="col-6">
            <table className={pstayle.ptable}>
              <tbody>
                <tr>
                  <td>
                    <span className={pstayle.pdetHeadSpan}>Item Type</span>
                  </td>
                  <td>
                    <span className={pstayle.pdetSpan}>
                      {props.proDetails.productname}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={pstayle.pdetHeadSpan}>Brand</span>
                  </td>
                  <td>
                    <span className={pstayle.pdetSpan}>
                      {props.proDetails.ProBrand}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={pstayle.pdetHeadSpan}>Model</span>
                  </td>
                  <td>
                    <span className={pstayle.pdetSpan}>
                      {props.proDetails.ProModel}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={pstayle.pdetHeadSpan}>Color</span>
                  </td>
                  <td>
                    <span className={pstayle.pdetSpan}>
                      {props.proDetails.ProColor}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={pstayle.pdetHeadSpan}>
                      Special features
                    </span>
                  </td>
                  <td>
                    <span className={pstayle.pdetSpan}>
                      {props.proDetails.FeatureOne},
                      {props.proDetails.FeatureTwo},
                      {props.proDetails.FeatureThree},
                      {props.proDetails.FeatureFour},
                      {props.proDetails.FeatureFive},
                      {props.proDetails.FeatureSix}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            {props.proDetails.ProDiscription && (
              <p className={pstayle.pdetSpan}>{props.proDetails.ProDiscription}</p>
            )}
          </div>
        </div>
      </div>
    </Aux>
  );
};
export default ProductDetails;
