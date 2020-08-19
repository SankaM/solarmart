import React, { Component } from "react";
import ACss from "../components/Style/AuthPage.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Image from "../Assets/null.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg:null
    };
  }
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    this.setState({
      errorMsg:null
    })
    axios
      .get(
        "http://localhost:56482/api/Account/ValidAdminLogin?email=" +
          this.state.email +
          "&password=" +
          this.state.password
      )
      .then((res) => {
        localStorage.setItem("SolrMAt", res.data);
        this.props.history.push("/admin");
      }).catch(error=>{
        this.setState({
          errorMsg:error.response.data.Message
        })
      });
  };
  render() {
    return (
      <div className={ACss.loginContainer}>
        <div className={ACss.FormContainer}>
          <form onSubmit={(e) => this.submit(e)}>
            <div className={ACss.LFHedSec}>
              <img src={Image} alt="Logo" className={ACss.formLogoImg} />
              <h3 className={ACss.LHader}>SLMart</h3>
            </div>
            <div className={ACss.formSec}>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  onChange={(e) => this.change(e)}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  onChange={(e) => this.change(e)}
                  value={this.state.password}
                />
              </div>
              <div className={ACss.errorMsg}>{this.state.errorMsg}</div>
              <div className={["form-group",ACss.LogBtnSec].join(' ')}>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
