import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as  AlertAction from '../../store/actions/indexAcc';

class LoginAlert extends Component {
  render() {
    return (
      <Aux>
        <Modal
          show={this.props.openAlert}
          onHide={this.props.closeAlertHandler()}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </Aux>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    openAlert: state.sbr.alertDilogOpen
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    closeAlertHandler:()=>dispatch(AlertAction.alertDiologClose())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginAlert)