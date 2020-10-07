import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import Slider from "../components/ImageSlider/ImageSlider";
import BuySec from "../components/BuySec/BuySec";
import ProductDetails from "../components/Pdetails/Pdetails";
import Rproduct from "../containers/reletedProduct";
import ItemStyle from "../components/Style/ItemPage.css";
import { Url } from "../Helpers/Jwt";
import codIcon from "../Assets/codIcon.png";
import deliveryIcon from "../Assets/deliveryIcon.png";
import Return from "../Assets/return.png";
import waranty from "../Assets/waranty.png";
//import axios from'axios';
class Item extends Component {
  constructor(prorp) {
    super(prorp);
    this.state = {
      product: [],
      Images: [],
      mImg: "",
    };
  }
  componentWillMount() {
    this.getProductForItem();
  }

  getProductForItem() {
    const { id } = this.props.match.params;
    const data = [];
    fetch(Url + "/Product/Product/" + id)
      .then((res) => res.json())
      .then((res) => {
        const mImg = res.Table1.findIndex((img) => img.IsMain === true);
        res.Table1.forEach((element) => {
          data.push({
            image: `http://localhost:56482/Images/${element.ImgName}`,
            text: "img1",
          });
        });
        this.setState({
          product: res.Table,
          Images: data,
          mImg: res.Table1[mImg].ImgName,
        });
      });
  }
  getRelatedProduct = (brand) => {};
  render() {
    const [product] = this.state.product;
    const Images = this.state.Images;
    return (
      <Layout>
        <div className={ItemStyle.ItemContainer}>
          <div className={[ItemStyle.upperRow, "row"].join(" ")}>
            <div className={ItemStyle.ImgSlidContiner}>
              {Images ? <Slider ImgList={Images} /> : null}
            </div>
            <div className={ItemStyle.UpperMidSec}>
              {product && (
                <h2 className={ItemStyle.prodName}>
                  {this.state.product[0].ProModel}{" "}
                  {this.state.product[0].ProBrand} (
                  {this.state.product[0].ProColor})
                </h2>
              )}
              {product && <BuySec product={product} MImg={this.state.mImg} />}
            </div>
            <div className={ItemStyle.UpperRightSec}>
              <h6 className={ItemStyle.infoSecHead}>Delivery Options</h6>
              <div className={ItemStyle.infoSec}>
                <div className="row">
                  <div className="col-3">
                    <img
                      src={deliveryIcon}
                      alt="deliveryIcon"
                      className={ItemStyle.infoIcon}
                    />
                  </div>
                  <div className="col-6">
                    <span className={ItemStyle.infoIcon}> Home Delivery </span>
                    <br />
                    <span className={ItemStyle.infoIconSub}>5 - 7 days</span>
                  </div>
                  <div className="col-3">Rs. 219</div>
                </div>
                <div className="row mt-3">
                  <div className="col-3">
                    <img
                      src={codIcon}
                      alt="deliveryIcon"
                      className={ItemStyle.infoIcon}
                    />
                  </div>
                  <div className="col-9">
                    <span className={ItemStyle.infoIcon}>
                      {" "}
                      Cash on Delivery Available
                    </span>
                    <br />
                  </div>
                </div>
              </div>
              <h6 className={ItemStyle.infoSecHead}>Return & Warranty</h6>
              <div className={ItemStyle.infoSec}>
                <div className="row mt-3">
                  <div className="col-3">
                    <img
                      src={Return}
                      alt="deliveryIcon"
                      className={ItemStyle.infoIcon}
                    />
                  </div>
                  <div className="col-9">
                    <span className={ItemStyle.infoIcon}> 7 Days Returns</span>
                    <br />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-3">
                    <img
                      src={waranty}
                      alt="deliveryIcon"
                      className={ItemStyle.infoIcon}
                    />
                  </div>
                  <div className="col-9">
                    <span className={ItemStyle.infoIcon}>
                      {" "}
                      seller does not provide warranty for this product
                    </span>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {product ? <ProductDetails proDetails={product} /> : null}

          <div className={ItemStyle.relatedProdSec}>
          <h3 className={ItemStyle.relatedProdHead}>Related Product</h3>
            <div className={ItemStyle.relatedProd}>
              <Rproduct PId={this.props.match.params.id} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Item;
