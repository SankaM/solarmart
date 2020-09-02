import React, { Component } from "react";
import Aux from "../hoc/Wrap";
import Layout from "../components/Layout/Layout";
import wList from "../components/Style/wishList.css";
import { getUserToken, Url } from "../Helpers/Jwt";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {connect} from 'react-redux';
import * as wishListAcc from '../store/actions/indexAcc';

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishItems: [],
    };
  }
  componentDidMount() {
    this.getWishItems();
  }
  getWishItems = () => {
    const user = getUserToken();
    axios({
      method: "GET",
      url: Url + "/CartAndWishList/getWishItemList",
      headers: {
        Authorization: `Beares ${user}`,
        "Content-Type": "application/json",
      },
    })
      .then((itemList) => {
        this.setState({
          wishItems: itemList.data,
        });
      })
      .catch((err) => console.log(err));
  };

  deleteWishItem=(ItemId)=>{
    const userToken = getUserToken();
    axios({
      method: "delete",
      url: Url + "/CartAndWishList/DeleteWishItem?itemId="+ItemId,
      headers: {
        Authorization: `Beares ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        this.getWishItems();
        this.props.updateNoOfWishListItem();
        this.props.setSnakbar(true,"success",resp.data);
      })
      .catch((err) => {console.log(err)
        this.props.setSnakbar(true,"error",err.message);
      });
  }
  render() {
    let list = <h1>Loading</h1>;
    if (this.state.wishItems) {
      list = this.state.wishItems.map((item) => (
        <div className={wList.wishItemCardConteiner} key={item.ProductId}>
          <div className="row">
            <div className={["col-2", wList.center].join(" ")}>
              <img
                src={"http://localhost:56482/Images/" + item.ImgName}
                alt={item.ImgName}
                className={wList.ItemImg}
              />
            </div>
            <div className="col-4">
              <h4>
                <a href={"/Item/"+item.ProductId}>{item.ProBrand} {item.ProModel} {item.ProColor}</a>
              </h4>
            </div>
            <div className={["col-3", wList.center].join(" ")}>
              {item.SellPrice}
            </div>
            <div className={["col-2", wList.center].join(" ")}>
              <IconButton aria-label="add to shopping cart" color="primary">
                <AddShoppingCartIcon />
              </IconButton>
            </div>
            <div className={["col-1", wList.center].join(" ")}>
              <IconButton aria-label="delete" edge="start" onClick={()=>{this.deleteWishItem(item.ProductId)}}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <Aux>
        <Layout>
          <div className="container">
            <h2 className={wList.wlistHader}>My Wishlist</h2>
            {list}
          </div>
        </Layout>
      </Aux>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    updateNoOfWishListItem:()=>dispatch(wishListAcc.getNoOfWishItem()),
    setSnakbar:(open,type,mesage)=>dispatch(wishListAcc.setSankBar(open,type,mesage))
  }
}
export default connect(null,mapDispatchToProps)(WishList);
