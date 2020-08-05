import React, { Component } from "react";
import Aux from "../hoc/Wrap";
import Card from "../components/Card/card";
import Cstyle from "../components/Style/container.css";
import { Link } from "react-router-dom";

class cardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      Products: [],
      filteredProduct: [],
      Brands: [],
      contentId: 0,
      max: 0,
      min: 0,
    };
  }
  componentDidMount() {
    this.getProduct();
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.contentId !== nextProps.contentId) {
      this.getRequestedProduct(nextProps.contentId);
    } else {
      this.getRequestedProduct(this.state.contentId);
    }
  }
  getProduct() {
    fetch("http://localhost:56482/api/Home/GetForCardAll")
      .then((responce) => responce.json())
      .then((res) => {
        this.setState({ allProducts: res });
      });
  }
  getRequestedProduct = (id) => {
    fetch("http://localhost:56482/api/Home/GetForCard/" + id)
      .then((responce) => responce.json())
      .then((data) =>
        this.setState({
          Products: data,
          filteredProduct: data,
        })
      );
    fetch("http://localhost:56482/api/Home/GetProBrand/" + id)
      .then((responce) => responce.json())
      .then((data) =>
        this.setState({
          Brands: data,
        })
      );
    this.setState({
      contentId: id,
      max: 0,
      min: 0,
    });
    console.log("fuck3");
  };
  filterAsBrand = (e, name) => {
    e.preventDefault();
    let tempProdList = [];
    this.state.Products.forEach((prod) => {
      if (prod.ProBrand === name) {
        tempProdList.push(prod);
      }
    });
    this.setState({
      filteredProduct: tempProdList,
    });
  };
  render() {
    let cards = <div>Loading</div>;
    if (this.state.allProducts.length !== 0 && this.props.contentId === 0) {
      cards = (
        <div className={Cstyle.FcardContainer}>
          <h4>latest updated products</h4>
          {this.state.allProducts.map((prod) => (
            <Link to={["/Item/", prod.ProductId].join("")} key={prod.ProductId}>
              <Card
                proPrice={prod.SellPrice}
                proModel={prod.ProModel}
                proBrand={prod.ProBrand}
                proName={prod.productname}
                proImg={prod.ImgName}
              />
            </Link>
          ))}
        </div>
      );
    } else {
      if (this.state.Products.length !== 0) {
        let priceFilter = null;
        if (this.state.max !== 0 || this.state.min !== 0) {
          priceFilter = (
            <div className={Cstyle.priceFilter}>
              <span className={Cstyle.filterPHead}>Filtered By:</span>{" "}
              <span className={Cstyle.priceTag}>
                Price {this.state.min} - {this.state.max}
              </span>
            </div>
          );
        }
        cards = (
          <div className={Cstyle.FcardContainer}>
            <div>
              <a
                href="#/"
                role="button"
                onClick={() => this.getRequestedProduct(0)}
              >
                Home
              </a>{" "}
              /
              <a
                href="#/"
                role="button"
                onClick={() => this.getRequestedProduct(this.props.contentId)}
              >
                {this.props.CategoryName}
              </a>
            </div>
            <h4 className={Cstyle.catoName}>{this.props.CategoryName}</h4>
            <div className={Cstyle.BrandNameFilter}>
              <h5 className={Cstyle.filterHead}>Brands</h5>
              {this.state.Brands.map((brand, index) => (
                <a
                  href="#/"
                  className={Cstyle.brandName}
                  key={index}
                  onClick={(e) => this.filterAsBrand(e, brand.ProBrand)}
                >
                  {brand.ProBrand}
                </a>
              ))}
            </div>
            {priceFilter}
            {this.state.filteredProduct.map((prod) => (
              <Link
                to={["/Item/", prod.ProductId].join("")}
                key={prod.ProductId}
              >
                <Card
                  proPrice={prod.SellPrice}
                  proModel={prod.ProModel}
                  proBrand={prod.ProBrand}
                  proName={prod.productname}
                  proImg={prod.ImgName}
                />
              </Link>
            ))}
          </div>
        );
      }
    }
    return <Aux>{cards}</Aux>;
  }
}
export default cardContainer;
