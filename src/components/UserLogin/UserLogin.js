import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import { Modal, Container, Form } from "react-bootstrap";
import ACss from "../Style/AuthPage.css";
import { CircularProgress } from "@material-ui/core";

// import axios from "axios";
import { connect } from "react-redux";
import * as LayoutAction from "../../store/actions/indexAcc";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // regModShow: false,
      Uemail: "",
      Upassword: "",
    };
  }

  UserCredactialHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    this.props.userLogin(this.state.Uemail, this.state.Upassword);
  };
  render() {
    return (
      <Aux>

        <Modal
          {...this.props}
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <h3 className={ACss.ulHader}>SLMart</h3>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <div className={ACss.UloginContainer}>
                <h3 className={ACss.ulLoginHader}>Login</h3>
                <Form onSubmit={(e) => this.submit(e)}>
                  <div className={ACss.formSec}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Uemail"
                        onFocus={()=>this.props.ClearErrMsg()}
                        onChange={(e) => this.UserCredactialHandler(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="Upassword"
                        onFocus={()=>this.props.ClearErrMsg()}
                        onChange={(e) => this.UserCredactialHandler(e)}
                      />
                    </div>
                    {this.props.loginError && <h5 className={ACss.errorMsg}>{this.props.loginError}</h5>}
                    <div className={["form-group", ACss.LogBtnSec].join(" ")}>
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </div>
                </Form>
                <div className={ACss.center}>
                  If you don't have SLMart Account{" "}
                  <a href="#/" onClick={() => this.props.registerUserOpen()}>
                    Register
                  </a>{" "}
                  here
                </div>
                {this.props.spiner ? (
                  <CircularProgress className={ACss.spinerWraper} />
                ) : null}
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spiner: state.lor.userLoginSpiner,
    loginError: state.lor.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserOpen: () => dispatch({ type: "REGUSERINLOG" }),
    ClearErrMsg: () => dispatch({ type: "CLEAREERRMSG" }),
    userLogin: (email, password) =>
      dispatch(LayoutAction.USerlogin(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
