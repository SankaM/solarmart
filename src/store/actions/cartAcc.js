import * as actionType from "./actionTypes";
import axios from 'axios';
import{getUserToken,Url} from '../../Helpers/Jwt';


export const updateCartItem=(cartItem)=>{
    return{
        type:actionType.UPDATE_CARTITEM,
        cartItem
    }
}

export const updateConfiredItem =(order)=>{
  return{
    type:actionType.UPDATE_CONFIRMED_ORDER,
    order
  }
}

export const setIniUserInfo =(info)=>{
  return{
    type:actionType.SETUSER_INFO,
    info
  }
}
export const changeShippInfo=(newInfo)=>{
  return{
    type:actionType.CHANGE_SHIPDETAILS,
    newInfo
  }
}

export const  getCarttems = () => {
    return (dispatch)=>{
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
            dispatch(updateCartItem(itemList.data))
          })
          .catch((err) => console.log(err));
    }
  };