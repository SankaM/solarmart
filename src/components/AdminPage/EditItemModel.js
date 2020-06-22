import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

class EditItemModel extends Component{
   
    hadlerSubmit=(event)=>{
        event.preventDefault();
        // eslint-disable-next-line no-unused-expressions
        fetch('http://localhost:56482/api/AdminService/Put',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ItemId:this.props.product.ProductId,
                ItemName:event.target.ItemName.value,
                BuyPrice:event.target.BuyPrice.value,
                SellPrice:event.target.SellPrice.value,
                CategoryId:event.target.Category.value,
                ItemDetails:event.target.details.value,
                ProBrand:event.target.ProBrand.value,
                ProModel:event.target.ProModel.value,
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
            alert("ok")
        },
        (error)=>{
          alert("No")
        })
    }
    
    render(){
        let content;
        if(typeof(this.props.product) !== 'undefined' ){
            content = <Form onSubmit={this.hadlerSubmit}>
            <div>
                <Row>
                    <Col>
                        <Form.Group controlId="ItemName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="ItemName" defaultValue={this.props.product.productname}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Product Color</Form.Label>
                            <Form.Control type="text" name="ProColor" defaultValue={this.props.product.ProColor} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Product Model</Form.Label>
                            <Form.Control type="text" name="ProModel" defaultValue={this.props.product.ProModel} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="Category" defaultValue={this.props.product.CategoryId} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Product Brand</Form.Label>
                            <Form.Control type="text" name="ProBrand" defaultValue={this.props.product.ProBrand} />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Price of Buy</Form.Label>
                            <Form.Control type="text" name="BuyPrice"  defaultValue={this.props.product.BuyPrice} placeholder="Price of Buy" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Price of Sell</Form.Label>
                            <Form.Control type="text" name="SellPrice" defaultValue={this.props.product.SellPrice}  />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Details</Form.Label>
                            <Form.Control type="text" as="textarea" rows="2" name="details" defaultValue={this.props.product.ProIntroduction}  />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <h6>Six key features </h6>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control type="text" name="feature1" defaultValue={this.props.product.FeatureOne}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" name="feature2" defaultValue={this.props.product.FeatureTwo}  />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control type="text" name="feature3" defaultValue={this.props.product.FeatureThree}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" name="feature4" defaultValue={this.props.product.FeatureFour}  />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control type="text" name="feature5" defaultValue={this.props.product.FeatureFive}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" name="feature6" defaultValue={this.props.product.FeatureSix}  />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Produduct discription & Other features</Form.Label>
                            <Form.Control type="text" as="textarea" rows="4" name="ProDiscrit" defaultValue={this.props.product.ProDiscription}  />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col>    
                    <Form.Group>
                        <Button type="submit" style={{float:"right"}}>Save Changes</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        }
        else{
            content = <h2>No Product</h2>
        }
       
        return(
            <div className="container">
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Update Item
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>          
                  {content}
            </Modal.Body>
          </Modal>
          </div>
        );
    }
}

export default EditItemModel;