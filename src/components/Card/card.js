import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import Card from "../Style/Card.css";
import { Link } from "react-router-dom";

import * as cardActions from "../../store/actions/indexAcc";
import {connect} from 'react-redux';

class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fcolor: "white",
      cColor: "white",
    };
  }
  changefBtnColor = () => {
    this.setState({
      fcolor: "green",
    });
  };
  changeCBtnColor = () => {
    this.setState({
      cColor: "green",
    });
  };
  render() {
    return (
      <Aux>
        <div className={Card.cardWraper}>
          <div className={Card.CImgSec}>
            <img
              src={"http://localhost:56482/Images/" + this.props.proImg}
              alt="kk"
              className={Card.cImg}
            />
            <div className={Card.cardAction}>
              <div className="row">
                <div className={["col", Card.cardImIcon].join(" ")}>
                  <a
                    href="#/"
                    style={{ color: this.state.cColor }}
                    onClick={() => {
                      this.props.addItemToCart(
                        this.props.IsUserExist,
                        this.props.proId
                      );
                      this.changeCBtnColor();
                    }}
                  >
                    <i
                      className={["fas fa-shopping-cart", Card.cardBtn].join(
                        " "
                      )}
                    ></i>
                  </a>
                </div>
                <div className={["col", Card.cardImIcon].join(" ")}>
                  <a
                    href="#/"
                    style={{ color: this.state.fcolor }}
                    onClick={() => {
                      this.props.addItemToWishList(
                        this.props.IsUserExist,
                        this.props.proId
                      );
                      this.changefBtnColor();
                    }}
                  >
                    <i className={["fa fa-heart", Card.cardBtn].join(" ")}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={Card.priceWraper}>
            <Link to={["/Item/", this.props.proId].join("")} onClick={()=>this.props.updateViews(this.props.proId)}>
              <span className={Card.price}>Rs:{this.props.proPrice}</span>
            </Link>
          </div>
          <div className={Card.cardMidle}>
            <Link to={["/Item/", this.props.proId].join("")} onClick={()=>this.props.updateViews(this.props.proId)}>
              <span className={Card.Model}>{this.props.proModel}</span>
            </Link>
          </div>
          <div className={Card.ItemNameWraper}>
            <Link to={["/Item/", this.props.proId].join("")} onClick={()=>this.props.updateViews(this.props.proId)}>
              <span className={Card.ItemName}>
                {[this.props.proBrand, this.props.proName].join(" ")}
              </span>
            </Link>
          </div>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    IsUserExist: state.lor.userLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToWishList: (IsUserExist, id) =>
      dispatch(cardActions.addItemToWishList(IsUserExist, id)),
    addItemToCart: (IsUserExist, id) =>
      dispatch(cardActions.addItemToCart(IsUserExist, id)),
    updateViews :(id)=>dispatch(cardActions.updateViews(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(card);
