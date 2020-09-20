import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import chOutcss from "../Style/checkOut.css";
import * as cartAction from "../../store/actions/indexAcc";
import {useDispatch} from "react-redux"

const ChangeAddressModel = (props) => {
  
  const dispatch = useDispatch();
  const  changeShipInfo = (e) => {
    e.preventDefault();
    const test ={
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      email:e.target.email.value,
      addrLine1: e.target.addl1.value,
      addrLine2: e.target.addl2.value,
      country: e.target.country.value,
      state: e.target.state.value,
      city: e.target.city.value,
      phoNo: e.target.cNo.value,
      zip: e.target.zip.value
    }
    dispatch(cartAction.changeShippInfo(test))
    props.handleClose();
  };
  
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={changeShipInfo} >
          <Modal.Body>
            <div>
              <h5 className={chOutcss.shipToHader}>Ship To</h5>
              <div>
                <div className="row">
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="first name"
                        required
                        name="fname"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label>Last name name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="last name"
                        name="lname"
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="line 1"
                        required
                        name="addl1"
                      />
                      <Form.Control
                        type="text"
                        placeholder="line 2 (optional)"
                        className="mt-1"
                        name="addl2"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                  <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="jonedoue@gmail.com"
                        name="email"
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Country"
                        name="country"
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-4">
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State / Province"
                        name="state"
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-4">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label>Contact No</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Countact number"
                        required
                        name="cNo"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Postal Zip code"
                        name="zip"
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
export default ChangeAddressModel;
