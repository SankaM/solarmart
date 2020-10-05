import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Url } from "../../Helpers/Jwt";

export const setCatRizeProduct = (prod) => {
  return {
    type: actionTypes.GET_CATRIZE_PROD,
    prod,
  };
};
export const setPriceTag = (min, max) => {
  return {
    type: actionTypes.SETPRICETAG,
    min,
    max,
  };
};

export const setFilterOptions = (
  selected_Main_CatoName,
  Selected_subCats,
  filter_Sub_cat
) => {
  return {
    type: actionTypes.SETFILTERS,
    selected_Main_CatoName,
    Selected_subCats,
    filter_Sub_cat,
  };
};

export const getCatRize2Product = (id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: Url + "/Home/GetCards/" + id,
    })
      .then((prod) => dispatch(setCatRizeProduct(prod.data)))
      .catch((err) => console.log(err));
  };
};

export const getCatRize1Product = (id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: Url + "/Home/GetCat1Cards/" + id,
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
    }).catch((err) => console.log(err));
  };
};

export const setFilter = (mid, cid) => {
  return (dispatch, getState) => {
    const catos = getState().colr.cato;
    const selected_Main_CatoName = catos.find((x) => x.CategoryId == mid)
      .CategoryName;
    const Selected_subCats = catos.find((x) => x.CategoryId == mid).SubCat;
    let filter_Sub_cat = null;
    if (cid !== "0") {
      filter_Sub_cat = Selected_subCats.find((x) => x.SubCatId == cid);
    }
    dispatch(
      setFilterOptions(selected_Main_CatoName, Selected_subCats, filter_Sub_cat)
    );
  };
};

export const getProductAcordingPrice = (min, max, McId, ScId) => {
  return (dispatch) => {
    if (min === "" && max === "") {
      if(ScId === '0'){
        dispatch(getCatRize1Product(McId));
      }
      else{
        dispatch(getCatRize2Product(ScId));
      }
      dispatch(setPriceTag(min,max ));
    } else if (min === "" && max !== "") {
      let newMin = 0;
      var params = new URLSearchParams();
      console.log(min);
      console.log(max);
      params.append("min", newMin);
      params.append("max", max);
      params.append("McId", McId);
      params.append("ScId", ScId);
      var request = {
        params: params,
      };
      axios.get(Url + "/Home/GetProdAccodPrice/", request).then((res) => {
        dispatch(setCatRizeProduct(res.data));
        dispatch(setPriceTag(min, max));
      });
    }else if(min !== "" && max === ""){
      let newMax = 0;
      var params = new URLSearchParams();
      console.log(min);
      console.log(max);
      params.append("min", min);
      params.append("max", newMax);
      params.append("McId", McId);
      params.append("ScId", ScId);
      var request = {
        params: params,
      };
      axios.get(Url + "/Home/GetProdAccodPrice/", request).then((res) => {
        dispatch(setCatRizeProduct(res.data));
        dispatch(setPriceTag(min, max));
      });
    }else{
      var params = new URLSearchParams();
      console.log(min);
      console.log(max);
      params.append("min", min);
      params.append("max", max);
      params.append("McId", McId);
      params.append("ScId", ScId);
      var request = {
        params: params,
      };
      axios.get(Url + "/Home/GetProdAccodPrice/", request).then((res) => {
        dispatch(setCatRizeProduct(res.data));
        dispatch(setPriceTag(min, max));
      });
    }
  };
};

// get categories

export const setCatgory = (cato) => {
  return {
    type: actionTypes.GETCATEGORIES,
    cato,
  };
};
export const GetCategory = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: Url + "/Catagory/GetCategory",
    })
      .then((res) => dispatch(setCatgory(res.data)))
      .catch((err) => console.log(err));
  };
};
