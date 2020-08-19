import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import Slider from "../components/ImageSlider/ImageSlider";
import VSec from "../components/VideoSec/BuySec";
import ProductDetails from "../components/Pdetails/Pdetails";
import Rproduct from "../containers/reletedProduct";
import ItemStyle from "../components/Style/ItemPage.css";

class Item extends Component {
  constructor(prorp) {
    super(prorp);
    this.state = {
      product: [],
      Images: [],
    };
  }
  componentDidMount() {
    this.getProductForItem();
  }

  getProductForItem() {
    const { id } = this.props.match.params;
    fetch("http://localhost:56482/api/Product/Product/" + id)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          product: res.Table,
          Images: res.Table1,
        });
      });
  }
  getRelatedProduct = (brand) => {

  };
  render() {
    const [product] = this.state.product;
    const Images = this.state.Images;
    return (
      <Layout>
      {product && (
        <h2 className={ItemStyle.prodName}>
          {this.state.product[0].ProModel} {this.state.product[0].ProBrand} (
          {this.state.product[0].ProColor})
        </h2>
      )}
        <div className="container">
        <div className="row">
          <div className="col-6">
            {Images ? <Slider ImgList={Images} /> : null}
          </div>
          <div className="col-6">{product && <VSec product={product} />}</div>
        </div>
        {product ? (
          <ProductDetails proDetails={product.ProDiscription} />
        ) : null}

        <Rproduct />
        </div>
      </Layout>
    );
  }
}
export default Item;
