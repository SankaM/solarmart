import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import Nav from "../Style/Layout.css";
import Image from "../../Assets/null.png";
import LoginUserImg from "../../Assets/login.png";
import UserLogin from "../UserLogin/UserLogin";
import RegisterModel from "../UserRegister/UserRegister";
import FaceBook from "../../Assets/facebook.png";
import Twiter from "../../Assets/twiter.png";
import Instragram from "../../Assets/Instrgram.png";

import { connect } from "react-redux";
import * as LayoutActions from "../../store/actions/indexAcc";
import { getUserToken } from "../../Helpers/Jwt";

class layout extends Component {
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
            <a
              href="#/"
              className={Nav.nav_btn + " " + Nav.test}
              onClick={() => this.props.logModelOpen()}
            >
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
            <a
              href="#/"
              className={Nav.nav_btn + " " + Nav.test}
              onClick={() => this.props.logModelOpen()}
            >
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
        <div className={Nav.footerSec}>
          <div className={Nav.footerSubSec}>
            <img src={Image} className={Nav.Logofooter} alt="footerLogo" />
            <h3 className={Nav.footComName}>SL MART</h3>
          </div>
          <div className={[Nav.footerSubSec, Nav.footerSubSecMid].join(" ")}>
            <h5 className={Nav.footSubHead}>Contact Us</h5>
            <p className={Nav.footSubPara}>
              071-2499044 / 0724975805 <br /> lakmaltgunasekara@gmail.com <br />
              No-251,Jayasiripura,pathana
            </p>
            <div>
              <a
                href="https://web.facebook.com/profile.php?id=100004661326828"
                target="blank"
              >
                {" "}
                <img
                  src={FaceBook}
                  className={Nav.socialMediaLogo}
                  alt="socialMediaLogo"
                />
              </a>
              <a href="https://twitter.com/tharind35660827">
                {" "}
                <img
                  src={Twiter}
                  className={Nav.socialMediaLogo}
                  alt="socialMediaLogo"
                />
              </a>
              <a href="https://www.instagram.com/tharidulakmalg/">
                {" "}
                <img
                  src={Instragram}
                  className={Nav.socialMediaLogo}
                  alt="socialMediaLogo"
                />
              </a>
            </div>
          </div>
          <div className={Nav.footerSubSec}>
            <a href="#/">Terms and Condition</a>
            <br />
            <a href="#/">Help & Support</a>
            <br />
            <a href="#/">Privecy Policy</a>
          </div>
        </div>
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
