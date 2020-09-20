import React, { Component } from "react";
import Aux from "../../hoc/Wrap";
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as  AlertAction from '../../store/actions/indexAcc';
import Button from '@material-ui/core/Button';

class confmBox extends Component {
  itemMoveHandler=()=>{
    this.props.addItemToWishList(true,this.props.movedItemId);
    this.props.deleteItemFromCart(this.props.movedItemId);
    this.props.priceCal(this.props.movedItemId);
  }

  render() {
    return (
      <Aux>
        <Modal
          show={this.props.openAlert}
          onHide={this.props.closeAlertHandler}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            Move To Wishlist
          </Modal.Header>
          <Modal.Body>
              Item(s) will be moved to wishlist and removed from cart.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" onClick={()=>this.props.closeAlertHandler()}>cancel</Button>
            <Button variant="contained" color="primary" onClick={()=>this.itemMoveHandler()}>move</Button>
          </Modal.Footer>
        </Modal>
      </Aux>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    openAlert: state.sbr.alertDilogOpen,
    movedItemId:state.sbr.movedItemId
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    closeAlertHandler:()=>dispatch(AlertAction.alertDiologClose()),
    addItemToWishList:(tr,id)=>dispatch(AlertAction.addItemToWishList(tr,id)),
    deleteItemFromCart:(id)=>dispatch(AlertAction.deleteItemFromCart(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(confmBox)