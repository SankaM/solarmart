import React from "react";
import { Modal } from "react-bootstrap";
import chOutcss from "../Style/checkOut.css";

const PaySucMg = (props) => {
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
            <h3 className={chOutcss.succHader}>Payment Successful</h3>
            <p>
                your order has submited,check your email address 
            </p>
        </Modal.Body>
        <Modal.Footer>
          <a className="btn btn-secondary" href="/">shop again</a>
          <a className="btn btn-primary" href="/MyOrders">See Order</a>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default PaySucMg;
