import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Url } from "../../Helpers/Jwt";

export const setCatRizeProduct = (prod) => {
  return {
    type: actionTypes.GET_CATRIZE_PROD,
    prod,
  };
};

export const getCatRizeProduct = (id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: Url + "/Home/GetCards/" + id,
    })
      .then((prod) => dispatch(setCatRizeProduct(prod.data)))
      .catch((err) => console.log(err));
  };
};

export const updateViews = (id) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: Url + "/Product/UpdateViews?prodId=" + id,
    }).catch(err=>console.log(err));
  };
};
