import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import Nav from "../Style/Layout.css";
import Image from "../../Assets/null.png";
import LoginUserImg from "../../Assets/login.png";
import UserLogin from "../UserLogin/UserLogin";
import RegisterModel from "../UserRegister/UserRegister";

import { connect } from "react-redux";
import * as LayoutActions from "../../store/actions/indexAcc";
import { getUserToken } from "../../Helpers/Jwt";

class layout extends Component {
  // closeLogMOdel = () => {
  //   this.setState({
  //     userLoginShow: false,
  //   });
  // };

  componentWillMount() {
    this.props.IsUserLOgin();
    var user = getUserToken();
    if (user) {
      this.props.getCurrentUserName();
      this.props.getNoOfWishItem();
      this.props.getNoOfCartItem();
    }
  }
  render() {
    const textArea = [Nav.Stestarea, "form-control"].join(" ");
    const catoDropdown = [Nav.catoDropDown, "input-group-append"].join(" ");
    return (
      <Aux>
        <div className={Nav.Nav}>
          <a href="/" role="button">
            <img src={Image} alt="Logo" className={Nav.logo}></img>
          </a>
          {this.props.Islogin ? (
            <a
              href="#/"
              className={Nav.nav_btn}
              onClick={this.props.userLogout}
            >
              Hi {this.props.currUserName}
            </a>
          ) : (
            <a
              href="#/"
              className={Nav.nav_btn}
              onClick={this.props.logModelOpen}
            >
              Log in
              <img src={LoginUserImg} alt="User" className={Nav.UserLoginImg} />
            </a>
          )}

          {this.props.Islogin ? (
            <a href="/Cart" className={Nav.nav_btn + " " + Nav.test}>
              <i
                className={["fas fa-shopping-cart", Nav.cartBtn].join(" ")}
              ></i>
              <span className={Nav.noOfItem}>{this.props.NoOfCartItems}</span>
            </a>
          ) : (
            <a href="#/" className={Nav.nav_btn + " " + Nav.test} onClick={()=>this.props.logModelOpen()}>
              <i
                className={["fas fa-shopping-cart", Nav.cartBtn].join(" ")}
              ></i>
              <span className={Nav.noOfItem}>0</span>
            </a>
          )}
          {this.props.Islogin ? (
            <a href="/wishList" className={Nav.nav_btn + " " + Nav.test}>
              <i className={["fa fa-heart", Nav.cartBtn].join(" ")}></i>
              <span className={Nav.noOfItem}>{this.props.NoOfwishItems}</span>
            </a>
          ) : (
            <a href="#/" className={Nav.nav_btn + " " + Nav.test} onClick={()=>this.props.logModelOpen()}>
              <i className={["fa fa-heart", Nav.cartBtn].join(" ")}></i>
              <span className={Nav.noOfItem}>0</span>
            </a>
          )}
          <div className={Nav.nav_t_container}>
            <div className={"input-group mb-3"}>
              <input
                type="text"
                className={textArea}
                placeholder="Search for anything"
              />
              <div className={catoDropdown}>
                <span
                  className={[Nav.searchBarText, "input-group-text"].join(" ")}
                >
                  All categories
                </span>
              </div>
            </div>
          </div>
        </div>
        <main>{this.props.children}</main>
        <UserLogin
          show={this.props.UsrLgin}
          onHide={this.props.logModelClose}
        />
        <RegisterModel
          show={this.props.UsrRegis}
          onHide={this.props.registerUserclose}
        />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UsrLgin: state.lor.loginModShow,
    UsrRegis: state.lor.registerModShow,
    Islogin: state.lor.userLogin,
    currUserName: state.lor.currentUserName,
    NoOfwishItems: state.cr.noOfWishListItem,
    NoOfCartItems: state.cr.noOfCartItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logModelOpen: () => dispatch(LayoutActions.loginModOpen()),
    logModelClose: () => dispatch(LayoutActions.loginModClose()),
    registeruserpen: () => dispatch(LayoutActions.regUserModOpen()),
    registerUserclose: () => dispatch(LayoutActions.regUserModClose()),
    IsUserLOgin: () => dispatch(LayoutActions.is_Userlogin()),
    userLogout: () => dispatch(LayoutActions.Userlogout()),
    getCurrentUserName: () => dispatch(LayoutActions.getCurrentUserName()),
    getNoOfWishItem: () => dispatch(LayoutActions.getNoOfWishItem()),
    getNoOfCartItem: () => dispatch(LayoutActions.getNoOfCartItem()),
    setSnak: (open, type, message) =>
    dispatch(LayoutActions.setSankBar(open, type, message)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(layout);
