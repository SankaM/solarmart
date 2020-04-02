import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AddItemModel extends Component{
    constructor(props){
        super(props);
        this.state ={SnackbarOpen:false,SnackbarMsg:''};
        this.hadlerSubmit = this.hadlerSubmit.bind(this);
    }

    SnackbarClose=(event)=>{
        this.setState({SnackbarOpen:false});
    }
    hadlerSubmit(event){
      event.preventDefault();
      // eslint-disable-next-line no-unused-expressions
      fetch('http://localhost:56482/api/Item/Post',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              ItemName:event.target.ItemName.value,
              BuyPrice:event.target.BuyPrice.value,
              SellPrice:event.target.SellPrice.value,
              CategoryId:event.target.Category.value,
              ItemDetails:event.target.details.value,
              ProModel:event.target.ProModel.value,
              ProBrand:event.target.ProBrand.value,
              ProColor:event.target.ProColor.value,
              feature1:event.target.feature1.value,
              feature2:event.target.feature2.value,
              feature3:event.target.feature3.value,
              feature4:event.target.feature4.value,
              feature5:event.target.feature5.value,
              feature6:event.target.feature6.value,
              ProDiscrit:event.target.ProDiscrit.value,
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          this.setState({SnackbarOpen:true,SnackbarMsg:result});
      },
      (error)=>{
        this.setState({SnackbarOpen:true,SnackbarMsg:'Failed to Update'});
      })
  }
    render(){
        return(
            <div className="container">
            <Snackbar
                anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                open={this.state.SnackbarOpen}
                autoHideDuration={4000}
                onClose={this.SnackbarClose}

                message={<span id="message-Id">{this.state.SnackbarMsg}</span>}
                action ={[<IconButton key="close" arial-label="close"  color="inherit" onClick={this.SnackbarClose}>
                        X
                    </IconButton>]}
            />                          
          <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-90w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.hadlerSubmit}>
            <div>
                <Row>
                    <Col>
                        <Form.Group controlId="ItemName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="ItemName" required placeholder="Item Name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Product Color</Form.Label>
                            <Form.Control type="text" name="ProColor" required placeholder="Product Color" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Product Model</Form.Label>
                            <Form.Control type="text" name="ProModel" required placeholder="Item category" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="Category" required placeholder="Item category" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Product Brand</Form.Label>
                            <Form.Control type="text" name="ProBrand" required placeholder="Item category" />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Price of Buy</Form.Label>
                            <Form.Control type="text" name="BuyPrice" required placeholder="Price of Buy" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Price of Sell</Form.Label>
                            <Form.Control type="text" name="SellPrice" required placeholder="Price of Sell" />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Details</Form.Label>
                            <Form.Control type="text" as="textarea" rows="2" name="details" required placeholder="Short Introduction about product" />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <h6>Six key features </h6>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control type="text" name="feature1" required placeholder="features" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" name="feature2" required placeholder="features" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control type="text" name="feature3" required placeholder="features" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" name="feature4" required placeholder="features" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control type="text" name="feature5" required placeholder="features" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" name="feature6" required placeholder="features" />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Produduct discription & Other features</Form.Label>
                            <Form.Control type="text" as="textarea" rows="4" name="ProDiscrit" required placeholder="Produduct discription & Other features" />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col>    
                    <Form.Group>
                        <Button type="submit" style={{float:"right"}}>Submit Item</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
          </Modal.Body>
        </Modal>
        </div>
        );
    }
}
export default AddItemModel;