import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import ACss from "../Style/AuthPage.css";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Url } from "../../Helpers/Jwt";
import axios from "axios";

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SnackbarOpen: false,
      SnackbarMsg: "",
      cpwerrMsg: "",
      emErrorMsg: "",
      emailExist: "",
      sendReq: false,
      pswordMsg: "",
      pwrdOk: false,
    };
  }
  ValidateEmail = (mail) => {
    //eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  IsEmailExist = () => {
    const email = document.getElementById("email").value;
    axios({
      method: "GET",
      url: Url + "/Account/EmailExist?Email=" + email,
    }).then((res) => {
      if (res.data === true) {
        this.setState({
          emailExist: "You have alredy registed  account using  above email",
          sendReq: false,
        });
      } else {
        this.setState({
          sendReq: true,
        });
      }
    });
  };
  passwordHandler = () => {
    const psWord = document.getElementById("psword").value;
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
    const IsOk = re.test(psWord);
    if (IsOk) {
      this.setState({
        pswordMsg: "ok! strong password",
        pwrdOk: true,
      });
    } else {
      this.setState({
        pswordMsg:
          "password must contain 8 or more than 8 characters and must contain uppercase letter, lowercase letter, number, and special character",
        pwrdOk: false,
      });
    }
  };
  clearErrMsg = () => {
    this.setState({
      emailExist: "",
      emErrorMsg: "",
    });
  };
  SnackbarClose = (event) => {
    this.setState({ SnackbarOpen: false });
  };
  userRegisterHandler = (event) => {
    event.preventDefault();
    this.setState({
      cpwerrMsg: "",
      emErrorMsg: "",
      emailExist: "",
    });
    if (event.target.password.value !== event.target.Cpassword.value) {
      this.setState({
        cpwerrMsg: "Confirm password does not match",
      });
    } else if (!this.ValidateEmail(event.target.email.value)) {
      this.setState({
        emErrorMsg: "Enter valid email address",
      });
    } else {
      axios({
        method: "post",
        url: Url + "/Account/CreateUserAccount",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Fname: event.target.fname.value,
          Lname: event.target.lname.value,
          Email: event.target.email.value,
          Pnumber: event.target.cNumber.value,
          Address: event.target.address.value,
          Bday: event.target.bday.value,
          Gender: event.target.gender.value,
          Password: event.target.password.value,
        }),
      })
        .then((res) => {
          console.log(res.data);
          this.setState({
            SnackbarOpen: true,
            SnackbarMsg: res.data,
            userLoginShow: true,
          });
          this.props.onHide();
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            SnackbarOpen: true,
            SnackbarMsg: "Failed to Update",
          });
        });
    }
  };
  render() {
    return (
      <Aux>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.SnackbarOpen}
          autoHideDuration={4000}
          onClose={this.SnackbarClose}
          message={<span id="message-Id">{this.state.SnackbarMsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="close"
              color="inherit"
              onClick={this.SnackbarClose}
            >
              X
            </IconButton>,
          ]}
        />
        <Modal
          size="lg"
          aria-labelledby="userRegisterModel"
          show={this.props.show}
          onHide={this.props.onHide}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="userRegisterModel">
              <h3 className={ACss.ulHader}>SLMart</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className={[ACss.center, ACss.ulLoginHader].join(" ")}>
              Create SLMart Account
            </h3>
            <Form onSubmit={this.userRegisterHandler}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      placeholder="first name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      placeholder="last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <div className="col-8">
                  <Form.Group className={ACss.formGroup}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      id="email"
                      placeholder="enter valid email"
                      autoComplete="nope"
                      onBlur={() => this.IsEmailExist()}
                      onFocus={() => this.clearErrMsg()}
                      required
                    />
                  </Form.Group>
                  {this.state.emErrorMsg && (
                    <span className={ACss.errorMsg}>
                      {this.state.emErrorMsg}
                    </span>
                  )}
                  {this.state.emailExist && (
                    <span className={ACss.errorMsg}>
                      {this.state.emailExist}
                    </span>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="number"
                      name="cNumber"
                      placeholder="Enter valid contact number"
                      required
                    />
                  </Form.Group>
                </div>
              </Row>
              <Row>
                <div className="col-6">
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter your perment address"
                      rows="2"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="bday" required />
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      ref="gender"
                      name="gender"
                      required
                      placeholder="gender"
                    >
                      <option key={1} value="male">
                        Male
                      </option>
                      <option key={2} value="female">
                        Female
                      </option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </Row>
              <Row>
                <Col>
                  <Form.Group className={ACss.formGroup}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      id="psword"
                      placeholder="Enter new password"
                      onChange={() => this.passwordHandler()}
                      required
                    />
                  </Form.Group>
                  {this.state.pwrdOk ? (
                    <span className={ACss.succWordMsg}>
                      {this.state.pswordMsg}
                    </span>
                  ) : (
                    <span className={ACss.errorMsg}>
                      {this.state.pswordMsg}
                    </span>
                  )}
                </Col>
                <Col>
                  <Form.Group className={ACss.formGroup}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Cpassword"
                      placeholder="Confirm password"
                      required
                    />
                  </Form.Group>
                  <span className={ACss.errorMsg}>{this.state.cpwerrMsg}</span>
                </Col>
              </Row>
              <Row>
                <div className="col-8"></div>
                <div className="col-4">
                  <Form.Group>
                    <Button
                      type="submit"
                      style={{ float: "right" }}
                      disabled={
                        this.state.sendReq === false ||
                        this.state.pwrdOk === false
                      }
                    >
                      Create
                    </Button>
                  </Form.Group>
                </div>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </Aux>
    );
  }
}
export default UserRegister;