import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import MStyle from "../Style/modelStyle.css";

class EditItemModel extends Component {
  state = {
    //FeImgUrl: null,
    mainImgUrl:null,
    SelectedFeImg: null,
    OthImgUrl: [],
    SelectedOtherImg: [],
    detailsForDeleteImg:[]
  };
  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.productimg !== "undefined"){
      this.FImgHandler(nextProps.productimg.Table[0].ImgName);
      this.OImgHandler(nextProps);
    }
  }

  hadlerSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    fetch("http://localhost:56482/api/EditProduct/UpdateProduct", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ItemId: this.props.product.ProductId,
        ItemName: event.target.ItemName.value,
        BuyPrice: event.target.BuyPrice.value,
        SellPrice: event.target.SellPrice.value,
        CategoryId: event.target.Category.value,
        ItemDetails: event.target.details.value,
        ProBrand: event.target.ProBrand.value,
        ProModel: event.target.ProModel.value,
        ProColor: event.target.ProColor.value,
        feature1: event.target.feature1.value,
        feature2: event.target.feature2.value,
        feature3: event.target.feature3.value,
        feature4: event.target.feature4.value,
        feature5: event.target.feature5.value,
        feature6: event.target.feature6.value,
        ProDiscrit: event.target.ProDiscrit.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("ok");
        },
        (error) => {
          alert("No");
        }
      );
      
      this.state.SelectedFeImg && this.UploadNewImages();
  };

  // main Image Functions

  FImgHandler = (nextProps) => {
    this.setState({
      mainImgUrl: "http://localhost:56482/Images/"+nextProps
    });
  };

  UploadNewImages=()=>{
    var MImg = new FormData();
    MImg.append('file',this.state.SelectedFeImg);
    MImg.append('ImgId',this.props.productimg.Table[0].ImgId);
    MImg.append('ImgPath',this.props.productimg.Table[0].ImgPath);
    fetch('http://localhost:56482/api/EditProduct/EditMainImg',{
      method:"POST",
      body:MImg
    });
  }

  EditfeatheImageHandler = (event) => {
    this.setState({
      SelectedFeImg: event.target.files[0],
    });
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        mainImgUrl: reader.result,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  removeFImage=(e)=>{
    e.preventDefault();
    this.setState({
      mainImgUrl:null,
      SelectedFeImg:null
    })
  }

  // end main Image funtions

  // other Image funtions
    OImgHandler=(nextProps)=>{
      var oUrlTemp = [];
      nextProps.productimg.Table1.forEach((file)=>{
        oUrlTemp.push({Url:"http://localhost:56482/Images/"+file.ImgName,ImgId:file.ImgId,ImgPath:file.ImgPath})
      })
      this.setState({
        OthImgUrl:oUrlTemp
      })
    }
    removeOImage=(e,index)=>{
      e.preventDefault();
      var oImgUrlList = this.state.OthImgUrl;
      oImgUrlList.splice(index,1);
      this.setState({
        OthImgUrl:oImgUrlList
      })
    }
    EditOtherImgHandler=(e)=>{
      let files = Array.from(e.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onload = () => {
          this.setState({
            SelectedOtherImg: [...this.state.SelectedOtherImg, file],
            OthImgUrl: [...this.state.OthImgUrl, {Url:reader.result,ImgId:null,ImgPath:null}],
          });
        };
        reader.readAsDataURL(file);
      });
    }
  // end Other Image funtions
  render() {
    let content;
    //let mainImage = null;
    //let OtherImages = null;
    if (
      typeof this.props.product !== "undefined" &&
      typeof this.props.productimg !== "undefined"
    ) {
      let mainImage = null;
      let OtherImagePreview = null;
      if (this.state.mainImgUrl) {
        mainImage = (
          <div className={MStyle.aImgWraper}>
            <a
            href="#javascript"
              className={MStyle.removeBtn}
              onClick={this.removeFImage}
            >
              x
            </a>
            <img
              src={
                this.state.mainImgUrl
              }
              id={MStyle.fImg}
              alt={this.state.mainImgUrl}
            />
          </div>
        );
      } 

      if (this.state.OthImgUrl.length !== 0) {
        OtherImagePreview = this.state.OthImgUrl.map((Img,index)=>
          <div className={MStyle.aImgWraper} key={index}>
            <a
              href="#/"
              className={MStyle.removeBtn}
              onClick={(e)=>this.removeOImage(e,index)}
            >
              x
            </a>
            <img
              src={
                Img.Url
              }
              id={MStyle.fImg}
              alt={Img.Url}
            />
          </div>
        );
      }
      content = (
        <Form onSubmit={this.hadlerSubmit}>
          <div>
            <Row>
              <Col>
                <Form.Group controlId="ItemName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ItemName"
                    defaultValue={this.props.product.productname}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Product Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProColor"
                    defaultValue={this.props.product.ProColor}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Product Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProModel"
                    defaultValue={this.props.product.ProModel}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="Category"
                    defaultValue={this.props.product.CategoryId}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Product Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProBrand"
                    defaultValue={this.props.product.ProBrand}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Price of Buy</Form.Label>
                  <Form.Control
                    type="text"
                    name="BuyPrice"
                    defaultValue={this.props.product.BuyPrice}
                    placeholder="Price of Buy"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Price of Sell</Form.Label>
                  <Form.Control
                    type="text"
                    name="SellPrice"
                    defaultValue={this.props.product.SellPrice}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows="2"
                    name="details"
                    defaultValue={this.props.product.ProIntroduction}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div>
            <h6>Six key features </h6>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="feature1"
                    defaultValue={this.props.product.FeatureOne}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="feature2"
                    defaultValue={this.props.product.FeatureTwo}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="feature3"
                    defaultValue={this.props.product.FeatureThree}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="feature4"
                    defaultValue={this.props.product.FeatureFour}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="feature5"
                    defaultValue={this.props.product.FeatureFive}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="feature6"
                    defaultValue={this.props.product.FeatureSix}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Produduct discription & Other features
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows="4"
                    name="ProDiscrit"
                    defaultValue={this.props.product.ProDiscription}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <h6>Main Image</h6>
                <label className="btn btn-primary">
                  Choose Image
                  <input
                    type="file"
                    id="browsFimage"
                    className="d-none"
                    onChange={this.EditfeatheImageHandler}
                  />
                </label>
                <div>{mainImage}</div>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <h6>Other Images</h6>
                <label className="btn btn-primary">
                  Choose Image
                  <input
                    type="file"
                    id="browsFimage"
                    className="d-none"
                    onChange={this.EditOtherImgHandler}
                    multiple
                  />
                </label>
                <div>{OtherImagePreview}</div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              <Form.Group>
                <Button type="submit" style={{ float: "right" }}>
                  Save Changes
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      );
    } else {
      content = <h2>No Product</h2>;
    }

    return (
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
          <Modal.Body>{content}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EditItemModel;
