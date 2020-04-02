import React from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

const hadleSubmit=(event)=>{
    event.preventDefault();
    fetch('http://localhost:56482/api/Catagory',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            CategoryId:null,
            CategoryName:event.target.category.value
        })
    }).then(res=>res.json()).then((res)=>console.log(res))
    this.props.onHide()
}
const AddCategoryModel =(props)=>{
    return(
        <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <Form onSubmit={hadleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" name="category" required placeholder="Add Category"/>
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" style={{float:"right"}}>Save</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Modal.Body>
      </Modal>
    );
}

export default AddCategoryModel;