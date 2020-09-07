import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as  AlertAction from '../../store/actions/indexAcc';
import Button from '@material-ui/core/Button';

class delConfBox extends Component {
  itemDeleteHandler=()=>{
    this.props.deleteItemFromCart(this.props.deleteCrtId);
  }

  render() {
    return (
      <Aux>
        <Modal
          show={this.props.delConfBoxOpen}
          onHide={this.props.delConfBClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            Remove from Cart
          </Modal.Header>
          <Modal.Body>
              Item(s) will be remove from cart.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" onClick={()=>this.props.delConfBClose()}>cancel</Button>
            <Button variant="contained" color="primary" onClick={()=>this.itemDeleteHandler()}>DELETE</Button>
          </Modal.Footer>
        </Modal>
      </Aux>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    deleteCrtId:state.sbr.deleteCrtId,
    delConfBoxOpen:state.sbr.delConfBoxOpen
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    delConfBClose:()=>dispatch(AlertAction.delConfBClose()),
    //addItemToWishList:(tr,id)=>dispatch(AlertAction.addItemToWishList(tr,id)),
    deleteItemFromCart:(id)=>dispatch(AlertAction.deleteItemFromCart(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(delConfBox)