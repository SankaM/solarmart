import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import CartS from "../components/Style/cart.css";
import { Table } from "react-bootstrap";
import { Checkbox } from "@material-ui/core";
import { getUserToken, Url } from "../Helpers/Jwt";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import NativeSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';

class Cart extends Component {
  constructor(props) {
    super();
    this.state = {
      cartItems: [],
      order: [],
      itemQuentity: [],
      subTotal: 0,
      shipingRental: 219,
      total: 0,
    };
  }

  componentDidMount() {
    this.getCarttems();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.order !== this.state.order) {
      this.updateSummery();
    }
  }
  updateSummery = () => {
    //alert("fire")
    let oders = [...this.state.order];
    let calsubtotal = 0;
    oders.forEach((order) => {
      calsubtotal = calsubtotal + order.price * order.quentity;
    });
    this.setState({
      subTotal: calsubtotal,
      total: calsubtotal + this.state.shipingRental,
    });
  };
  getCarttems = () => {
    const user = getUserToken();
    axios({
      method: "GET",
      url: Url + "/CartAndWishList/getCartItemList",
      headers: {
        Authorization: `Beares ${user}`,
        "Content-Type": "application/json",
      },
    })
      .then((itemList) => {
        this.setState({
          cartItems: itemList.data,
        });
      })
      .catch((err) => console.log(err));
  };

  addItemToSummary = (e, price, ItemId) => {
    let order = [...this.state.order];
    let oquatity = [...this.state.itemQuentity];
    if (oquatity.some((data) => data.id === ItemId)) {
      let index = oquatity.findIndex((data) => data.id === ItemId);
      let noOfItem = oquatity[index].quentity;
      if (e.target.checked) {
        order.push({ id: ItemId, price: price, quentity: noOfItem });
        this.setState({
          order: order,
        });
      } else {
        order.forEach((item, index) => {
          if (item.id === ItemId) {
            order.splice(index, 1);
          }
        });
        this.setState({
          order: order,
        });
      }
    } else {
      if (e.target.checked) {
        order.push({ id: ItemId, price: price, quentity: 1 });
        this.setState({
          order: order,
        });
      } else {
        order.forEach((item, index) => {
          if (item.id === ItemId) {
            order.splice(index, 1);
          }
        });
        this.setState({
          order: order,
        });
      }
    }
  };
  quantityHandlaer = (e, Id) => {
    let oQuetity = [...this.state.itemQuentity];
    if (oQuetity.some((data) => data.id === Id)) {
      oQuetity.forEach((data, index) => {
        if (data.id === Id) {
          oQuetity[index].quentity = e.target.value;
        }
      });
    } else {
      oQuetity.push({ id: Id, quentity: e.target.value });
    }
    this.setState({
      itemQuentity: oQuetity,
    });
  };

  updateOder = (e, Id) => {
    let currOder = [...this.state.order];
    if (currOder.some((data) => data.id === Id)) {
      currOder.forEach((data) => {
        if (data.id === Id) {
          data.quentity = e.target.value;
        }
      });
      this.setState({
        order: currOder,
      });
    }
  };
  render() {
    let cartItemList = <h1>Loading</h1>;
    if (this.state.cartItems) {
      cartItemList = (
        <div className={CartS.tableContainer}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cartItems.map((Item) => (
                <tr key={Item.ProductId}>
                  <td>
                    <Checkbox
                      inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                      onChange={(e) =>
                        this.addItemToSummary(e, Item.SellPrice, Item.ProductId)
                      }
                    />
                  </td>
                  <td>
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={"http://localhost:56482/Images/" + Item.ImgName}
                          className={CartS.prodImg}
                          alt={Item.ImgName}
                        />
                      </div>
                      <div className="col-10">
                        <span>
                          {Item.ProBrand} {Item.ProModel}{" "}
                        </span>
                        <span>{Item.ProColor}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="row">Rs :{Item.SellPrice}</div>
                    <div className="row">
                      <div className="col-6">
                        <IconButton color="default" component="span">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="col-6">
                        <IconButton style={{ color: "red" }} component="span">
                          <FavoriteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </td>
                  <td>
                    <NativeSelect
                      id="select"
                      defaultValue="1"
                      onChange={(e) => {
                        this.quantityHandlaer(e, Item.ProductId);
                        this.updateOder(e, Item.ProductId);
                      }}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                    </NativeSelect>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
    return (
      <Layout>
        <div className={CartS.cartContainer}>
          <div className="row">
            <div className="col-8">{cartItemList}</div>
            <div className="col-4">
              <div className={CartS.SummaryCantainer}>
                <h3 className={CartS.summaryHader}>Order Summary</h3>
                <div className={["row", CartS.summaryRow].join(" ")}>
                  <div className="col-7">
                    <span className={CartS.summarySpan}>Subtotal</span>
                    <span className={CartS.summarySpan}>
                      ({this.state.order.length} Items)
                    </span>
                  </div>
                  <div className="col-5">
                    <span className={CartS.summarySpan}>
                      Rs : {this.state.subTotal}
                    </span>
                  </div>
                </div>
                <div className={["row", CartS.summaryRow].join(" ")}>
                  <div className="col-7">
                    <span className={CartS.summarySpan}>Shipping Fee</span>
                  </div>
                  <div className="col-5">
                    <span className={CartS.summarySpan}>Rs : 219</span>
                  </div>
                </div>
                <div className={["row", CartS.summaryRow].join(" ")}>
                  <div className="col-7">
                    <span className={CartS.summarySpan}>Total</span>
                  </div>
                  <div className="col-5">
                    <span className={CartS.tsummarySpan}>
                      Rs : {this.state.total}
                    </span>
                  </div>
                </div>
                <div className={["row", CartS.summaryRow].join(" ")}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={CartS.summaryBtn}
                    //className={classes.button}
                    //endIcon={<Icon>send</Icon>}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Cart;
