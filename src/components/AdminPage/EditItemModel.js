import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import MStyle from "../Style/modelStyle.css";

class EditItemModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //FeImgUrl: null,
      mainImgUrl: null,
      SelectedFeImg: null,
      OthImgUrl: [],
      SelectedOtherImg: [],
      detailsForDeleteImg: [],
      newPhoto: 0,
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

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.productimg !== "undefined") {
      this.FImgHandler(nextProps.productimg.Table[0].ImgName);
      this.OImgHandler(nextProps);
    }
    console.log("1");
    if (nextProps.product) {
      this.setState({
        profit: nextProps.product.proft,
        newPrice: nextProps.product.Act_SellPrice,
        oPrice: nextProps.product.SellPrice,
        bPrice: nextProps.product.BuyPrice,
        discount: nextProps.product.discount,
      });
    }
  }

  hadlerSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    fetch("http://localhost:56482/api/AdminService/UpdateProduct", {
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
        Discount: event.target.Discount.value,
        Profit: event.target.profit.value,
        ActSelPrice: event.target.n_S_price.value,
        Prd_Qty: event.target.pQyt.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );

    this.state.SelectedFeImg !== null && this.UploadNewMainImage();
    this.state.SelectedOtherImg.length !== 0 &&
      this.UploadNewOtherImages(this.props.product.ProductId);
    this.state.detailsForDeleteImg.length !== 0 &&
      this.DeleteEditedImages(this.state.detailsForDeleteImg);
  };

  // main Image Functions

  FImgHandler = (nextProps) => {
    this.setState({
      mainImgUrl: "http://localhost:56482/Images/" + nextProps,
    });
  };

  UploadNewMainImage = () => {
    var MImg = new FormData();
    MImg.append("file", this.state.SelectedFeImg);
    MImg.append("ImgId", this.props.productimg.Table[0].ImgId);
    MImg.append("ImgPath", this.props.productimg.Table[0].ImgPath);
    fetch("http://localhost:56482/api/AdminService/EditMainImg", {
      method: "POST",
      body: MImg,
    });
  };

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
  removeFImage = (e) => {
    e.preventDefault();
    this.setState({
      mainImgUrl: null,
      SelectedFeImg: null,
    });
  };

  // end main Image funtions

  // other Image funtions
  UploadNewOtherImages = (id) => {
    var eOImges = new FormData();
    var ImgList = this.state.SelectedOtherImg;
    for (let i = 0; i < ImgList.length; i++) {
      eOImges.append("myFile[]", ImgList[i].file);
    }
    eOImges.append("productId", id);
    fetch("http://localhost:56482/api/AdminService/EditOtherImages", {
      method: "POST",
      body: eOImges,
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
  };

  DeleteEditedImages = (list) => {
    fetch("http://localhost:56482/api/AdminService/DeleteEditedImages", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        List: list,
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
  };

  OImgHandler = (nextProps) => {
    var oUrlTemp = [];
    nextProps.productimg.Table1.forEach((file) => {
      oUrlTemp.push({
        NewPId: null,
        Url: "http://localhost:56482/Images/" + file.ImgName,
        ImgId: file.ImgId,
        ImgPath: file.ImgPath,
        IsNew: false,
      });
    });
    this.setState({
      OthImgUrl: oUrlTemp,
    });
  };
  removeOImage = (e, index, newOne, id, path, NewPId) => {
    e.preventDefault();
    var oImgUrlList = this.state.OthImgUrl;
    if (newOne) {
      oImgUrlList.splice(index, 1);
      this.setState({
        OthImgUrl: oImgUrlList,
      });
      var selectImg = this.state.SelectedOtherImg;
      selectImg.forEach((ImgFile, index) => {
        if (ImgFile.id === NewPId) {
          selectImg.splice(index, 1);
        }
      });
      this.setState({
        SelectedOtherImg: selectImg,
      });
    } else {
      var deleteImgList = [...this.state.detailsForDeleteImg];
      deleteImgList.push({ ImgId: id, ImgPath: path });
      this.setState({
        detailsForDeleteImg: deleteImgList,
      });
      oImgUrlList.splice(index, 1);
      this.setState({
        OthImgUrl: oImgUrlList,
      });
    }
  };
  EditOtherImgHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file, index) => {
      let reader = new FileReader();
      let newPhoto = this.state.newPhoto;
      newPhoto = newPhoto + (index + 1);
      reader.onload = () => {
        this.setState({
          SelectedOtherImg: [
            ...this.state.SelectedOtherImg,
            { file: file, id: newPhoto },
          ],
          OthImgUrl: [
            ...this.state.OthImgUrl,
            {
              NewPId: newPhoto,
              Url: reader.result,
              ImgId: null,
              ImgPath: null,
              IsNew: true,
            },
          ],
        });
      };
      this.setState({
        newPhoto: newPhoto,
      });
      reader.readAsDataURL(file);
    });
  };
  // end Other Image funtions
  render() {
    let content;
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
              src={this.state.mainImgUrl}
              id={MStyle.fImg}
              alt={this.state.mainImgUrl}
            />
          </div>
        );
      }

      if (this.state.OthImgUrl.length !== 0) {
        OtherImagePreview = this.state.OthImgUrl.map((Img, index) => (
          <div className={MStyle.aImgWraper} key={index}>
            <a
              href="#/"
              className={MStyle.removeBtn}
              onClick={(e) =>
                this.removeOImage(
                  e,
                  index,
                  Img.IsNew,
                  Img.ImgId,
                  Img.ImgPath,
                  Img.NewPId
                )
              }
            >
              x
            </a>
            <img src={Img.Url} id={MStyle.fImg} alt={Img.Url} />
          </div>
        ));
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
                  <Form.Label>Product quatity</Form.Label>
                  <Form.Control
                    type="number"
                    name="pQyt"
                    defaultValue={this.props.product.prod_qty}
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
            <Row>
              <Col>
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
                  <Form.Label>Sub Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="Category"
                    defaultValue={this.props.product.CategoryId}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Price of Buy / Production cost</Form.Label>
                  <Form.Control
                    type="text"
                    name="BuyPrice"
                    defaultValue={this.props.product.BuyPrice}
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
                    type="text"
                    name="SellPrice"
                    defaultValue={this.props.product.SellPrice}
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
                    name="Discount"
                    defaultValue={this.props.product.discount}
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
                    defaultValue={this.props.product.proft}
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
                    defaultValue={this.props.product.Act_SellPrice}
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
