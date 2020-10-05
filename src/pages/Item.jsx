import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import Slider from "../components/ImageSlider/ImageSlider";
import BuySec from "../components/VideoSec/BuySec";
import ProductDetails from "../components/Pdetails/Pdetails";
import Rproduct from "../containers/reletedProduct";
import ItemStyle from "../components/Style/ItemPage.css";
import {Url} from '../Helpers/Jwt';
//import axios from'axios';
class Item extends Component {
  constructor(prorp) {
    super(prorp);
    this.state = {
      product: [],
      Images: [],
      mImg:""
    };
  }
  componentWillMount(){
    this.getProductForItem();
  }
  
  getProductForItem() {
    const { id } = this.props.match.params;
    const data = [];
    fetch(Url+"/Product/Product/" + id)
      .then((res) => res.json())
      .then((res) => {
        const mImg = res.Table1.findIndex(img=>img.IsMain ===true);
        res.Table1.forEach(element => {
          data.push({
            image:`http://localhost:56482/Images/${element.ImgName}` ,
            text:'img1'
          })
        });
        this.setState({
          product: res.Table,
          Images: data,
          mImg:res.Table1[mImg].ImgName
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
          <div className="col-6">{product && <BuySec product={product} MImg={this.state.mImg}/>}</div>
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
