import React, { Component } from "react";
import Aux from "../hoc/Wrap";
import Card from "../components/Card/card";
import Cstyle from "../components/Style/container.css";
import { connect } from "react-redux";
//import * as collectionAcc from "../store/actions/indexAcc";

class cardContainer extends Component {
  render() {
    let cards = <div>Loading</div>;
    if (this.props.Products.length !== 0) {
      cards = (
        <div className={Cstyle.FcardContainer}>
          {this.props.Products.map((prod) => (
            <Card
              proPrice={prod.Act_SellPrice}
              proModel={prod.ProModel}
              proBrand={prod.ProBrand}
              proName={prod.productname}
              proImg={prod.ImgName}
              proId={prod.ProductId}
              key={prod.ProductId}
            />
          ))}
        </div>
      );
    } else {
      cards = (
        <div>
          <h1>Store Empty !! We will Update store soon</h1>
        </div>
      );
    }
    return (
      <Aux>
        {cards}
      </Aux>);
  }
}

const mapStateToProps = (state) => {
  return {
    Products: state.colr.product,
  };
};

export default connect(mapStateToProps, null)(cardContainer);
