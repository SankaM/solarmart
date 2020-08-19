import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import { Modal, Container ,Form} from "react-bootstrap";
import ACss from "../Style/AuthPage.css";
import RegisterModel from "../UserRegister/UserRegister";
import axios from "axios";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regModShow: false,
      Uemail: "",
      Upassword: "",
    };
  }
  registerUser = () => {
    this.props.onHide();
    this.setState({
      regModShow: true,
    });
  };

  UserCredactialHandler = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  };

  submit = (e) => {
    e.preventDefault();
    axios
      .get(
        "http://localhost:56482/api/Account/ValidAdminLogin?email=" +
        this.state.Uemail +
          "&password=" +
          this.state.Upassword
      )
      .then((res) => {
        localStorage.setItem("SolrMUt", res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  render() {
    return(
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
              <h3 className={ACss.ulLoginHader}>Login</h3>
              <Form onSubmit={(e)=>this.submit(e)}>
                <div className={ACss.formSec}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      name="Uemail"
                      onChange={(e) => this.UserCredactialHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="Upassword"
                      onChange={(e) => this.UserCredactialHandler(e)}
                    />
                  </div>
                  <div className={["form-group", ACss.LogBtnSec].join(" ")}>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </Form>
              <div className={ACss.center}>
                If you don't have SLMart Account{" "}
                <a href="#/" onClick={() => this.registerUser()}>
                  Register
                </a>{" "}
                here
              </div>
            </Container>
          </Modal.Body>
        </Modal>
        <RegisterModel show={this.state.regModShow} onHide={()=>this.setState({
          regModShow:false
        })}/>
      </Aux>
    );
  }
}
export default UserLogin;
