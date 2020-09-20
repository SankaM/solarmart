import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import MStyle from "../Style/modelStyle.css";
import { v4 as uuidv4 } from "uuid";
import { Url } from "../../Helpers/Jwt";
import axios from 'axios';

class AddItemModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SnackbarOpen: false,
      SnackbarMsg: "",
      selectedFImage: null,
      fPrevewImagURL: null,
      selectedOImages: [],
      OpreviewImageURL: [],
      subCat:[],
      subCatStatus:false,
      profit: 0,
      newPrice: 0,
      oPrice: 0,
      bPrice: 0,
      discount: 0,
    };
  }

  priceHandler = (bp, sp, di) => {
    const newPr = sp - (sp * di) / 100;
    this.setState({
      oPrice: sp,
      bPrice: bp,
      discount: di,
      newPrice: newPr,
      profit: newPr - bp,
    });
  };

  SnackbarClose = (event) => {
    this.setState({ SnackbarOpen: false });
  };

  getSubCat=(e)=>{
    let mCatId = e.target.value;
    if(mCatId){
      axios({
        method:"GET",
        url:Url + "/Catagory/GetSubCats?id="+ mCatId
      }).then(res=>{
        this.setState({
          subCat:res.data,
          subCatStatus:true
        })
      }).catch(err=>console.log(err))
    }else{
      this.setState({
        subCat:[],
        subCatStatus:false
      })
    }
  }

  hadlerSubmit = (event) => {
    event.preventDefault();
    var ProductId = uuidv4();
    // eslint-disable-next-line no-unused-expressions
    fetch(Url + "/AdminService/PostItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ItemId: ProductId,
        ItemName: event.target.ItemName.value,
        BuyPrice: event.target.BuyPrice.value,
        SellPrice: event.target.SellPrice.value,
        CategoryId: this.refs.Category.value,
        SubCategoryId: this.refs.subCategory.value,
        ProModel: event.target.ProModel.value,
        ProBrand: event.target.ProBrand.value,
        ProColor: event.target.ProColor.value,
        feature1: event.target.feature1.value,
        feature2: event.target.feature2.value,
        feature3: event.target.feature3.value,
        feature4: event.target.feature4.value,
        feature5: event.target.feature5.value,
        feature6: event.target.feature6.value,
        ProDiscrit: event.target.ProDiscrit.value,
        Discount: event.target.discount.value,
        Profit: event.target.profit.value,
        ActSelPrice: event.target.n_S_price.value,
        Prd_Qty: event.target.pQyt.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ SnackbarOpen: true, SnackbarMsg: result });
        },
        (error) => {
          this.setState({
            SnackbarOpen: true,
            SnackbarMsg: "Failed to Update",
          });
        }
      );

    var FImage = new FormData();
    FImage.append("file", this.state.selectedFImage);
    FImage.append("ItemId", ProductId);
    FImage.append("IsMain", 1);
    fetch("http://localhost:56482/api/AdminService/InsertItemImage", {
      method: "POST",
      body: FImage,
    });
    this.uploadOtherImages(ProductId);
    //this.props.onHide();
  };

  uploadOtherImages = (ProductId) => {
    var OImges = new FormData();
    for (const file of this.state.selectedOImages) {
      OImges.append("myFile[]", file);
    }
    OImges.append("ItemId", ProductId);
    OImges.append("IsMain", 0);
    fetch("http://localhost:56482/api/AdminService/AddOtherImages", {
      method: "POST",
      body: OImges,
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
  };

  featheImageHandler = (event) => {
    this.setState({
      selectedFImage: event.target.files[0],
    });

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        fPrevewImagURL: reader.result,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  OtherImageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      let reader = new FileReader();
      reader.onload = () => {
        this.setState({
          selectedOImages: [...this.state.selectedOImages, file],
          OpreviewImageURL: [...this.state.OpreviewImageURL, reader.result],
        });
      };
      reader.readAsDataURL(file);
    });
  };
  removeFImage = () => {
    this.setState({
      selectedFImage: null,
    });
  };
  removeOImage = (index) => {
    var oImgUrl = this.state.OpreviewImageURL;
    var OImg = this.state.selectedOImages;
    oImgUrl.splice(index, 1);
    OImg.splice(index, 1);
    this.setState({
      selectedOImages: OImg,
      OpreviewImageURL: oImgUrl,
    });
  };
  render() {
    let fImagePreview = null;
    let OtherImagePreview = null;
    if (this.state.selectedFImage) {
      fImagePreview = (
        <div className={MStyle.aImgWraper}>
          <a href="#/" className={MStyle.removeBtn} onClick={this.removeFImage}>
            x
          </a>
          <img
            src={this.state.fPrevewImagURL}
            id={MStyle.fImg}
            alt="featureImage"
          />
        </div>
      );
    }
    if (this.state.selectedOImages.length !== 0) {
      OtherImagePreview = this.state.OpreviewImageURL.map((url, index) => (
        <div className={MStyle.aImgWraper} key={index}>
          <a
            href="#/"
            className={MStyle.removeBtn}
            onClick={() => this.removeOImage(index)}
          >
            x
          </a>
          <img
            src={url}
            alt="otherImage"
            className={MStyle.oImg}
            id={MStyle.fImg}
          />
        </div>
      ));
    }
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.SnackbarOpen}
          autoHideDuration={4000}
          onClose={this.SnackbarClose}
          message={<span id="message-Id">{this.state.SnackbarMsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="close"
              color="inherit"
              onClick={this.SnackbarClose}
            >
              X
            </IconButton>,
          ]}
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
                      <Form.Control
                        type="text"
                        name="ItemName"
                        required
                        placeholder="Item Name"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Product Color</Form.Label>
                      <Form.Control
                        type="text"
                        name="ProColor"
                        placeholder="Product Color"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Product Model</Form.Label>
                      <Form.Control
                        type="text"
                        name="ProModel"
                        required
                        placeholder="Product Model"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Product quatity</Form.Label>
                      <Form.Control
                        type="number"
                        name="pQyt"
                        placeholder="Enter number of product"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Product Brand</Form.Label>
                      <Form.Control
                        type="text"
                        name="ProBrand"
                        placeholder="Item category"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        ref="Category"
                        required
                        placeholder="Item category"
                        onChange={(e)=>this.getSubCat(e)}
                      >
                        <option value=''>Select Main category</option>
                        {this.props.catagory.map((cato) => (
                          <option key={cato.CategoryId} value={cato.CategoryId}>
                            {cato.CategoryName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Sub Category</Form.Label>
                      <Form.Control
                        as="select"
                        ref="subCategory"
                        required
                        placeholder="Item category"
                        disabled={!this.state.subCatStatus}
                      >
                        <option value=''>Select sub category</option>
                        {this.state.subCat && this.state.subCat.map((cato) => (
                          <option key={cato.SubCatId} value={cato.SubCatId}>
                            {cato.subCatName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Price of Buy / Production cost </Form.Label>
                      <Form.Control
                        type="number"
                        name="BuyPrice"
                        placeholder="Price of Buy"
                        onChange={(e) =>
                          this.priceHandler(
                            e.target.value,
                            this.state.oPrice,
                            this.state.discount
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Price of Sell</Form.Label>
                      <Form.Control
                        type="number"
                        name="SellPrice"
                        placeholder="Price of Sell"
                        onChange={(e) =>
                          this.priceHandler(
                            this.state.bPrice,
                            e.target.value,
                            this.state.discount
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Discount (%)(optional)</Form.Label>
                      <Form.Control
                        type="number"
                        name="discount"
                        placeholder="Discount"
                        onChange={(e) =>
                          this.priceHandler(
                            this.state.bPrice,
                            this.state.oPrice,
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Profit</Form.Label>
                      <Form.Control
                        type="number"
                        name="profit"
                        //defaultValue={this.state.profit}
                        value={this.state.profit}
                        placeholder="Your profit"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>New Sell Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="n_S_price"
                        //defaultValue={this.state.newPrice}
                        value={this.state.newPrice}
                        placeholder="New Sell Price"
                        disabled
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
                        placeholder="features"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="feature2"
                        placeholder="features"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="feature3"
                        placeholder="features"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="feature4"
                        placeholder="features"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="feature5"
                        placeholder="features"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="feature6"
                        placeholder="features"
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
                        placeholder="Produduct discription & Other features"
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
                        onChange={this.featheImageHandler}
                        required
                      />
                    </label>
                    <div>{fImagePreview}</div>
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
                        onChange={this.OtherImageHandler}
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
                      Submit Item
                    </Button>
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
