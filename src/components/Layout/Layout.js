import React, {Component } from "react";
import Aux from "../../hoc/Wrap";
import Nav from "../Style/Layout.css";
import Image from "../../Assets/null.png";
import LoginUserImg from "../../Assets/login.png";
import UserLogin from "../UserLogin/UserLogin";

class layout extends Component {
  constructor(props){
      super(props);
      this.state={
        userLoginShow:false
      }
  }
  closeLogMOdel=()=>{
    this.setState({
      userLoginShow:false
    })
  }
  render(){
    const textArea = [Nav.Stestarea, "form-control"].join(" ");
    const catoDropdown = [Nav.catoDropDown, "input-group-append"].join(" ");
    return (
        <Aux>
          <div className={Nav.Nav}>
            <a href="/" role="button">
              <img src={Image} alt="Logo" className={Nav.logo}></img>
            </a>
            <a href="#/" className={Nav.nav_btn} onClick={()=>this.setState({userLoginShow:true})}>
              Log in
              <img src={LoginUserImg} alt="User" className={Nav.UserLoginImg} />
            </a>
            <a href="C" className={Nav.nav_btn + " " + Nav.test}>
              <i className={["fas fa-shopping-cart", Nav.cartBtn].join(" ")}></i>
            </a>
            <a href="C" className={Nav.nav_btn + " " + Nav.test}>
              <i className={["fa fa-heart", Nav.cartBtn].join(" ")}></i>
            </a>
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
          <UserLogin show={this.state.userLoginShow} onHide={this.closeLogMOdel}/>
        </Aux>
      );
  }
};
export default layout;
