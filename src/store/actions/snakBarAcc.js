import * as actionType from "./actionTypes";
import axios from 'axios';
import{getUserToken,Url} from '../../Helpers/Jwt';
import {getNoOfWishItem,getCarttems,getNoOfCartItem} from '../actions/indexAcc';

export const setSankBar = (
  snakbarOpen,
  snakbarType = "success",
  snakbarMessage = ""
) => {
  return{
    type: actionType.SET_SNAKBAR,
    snakbarOpen, 
    snakbarType, 
    snakbarMessage
  }
};

export const alertDiologOpen=(ItemId)=>{
  return{
    type:actionType.ALERT_DILOG_OPEN,
    ItemId
  }
}
export const alertDiologClose=()=>{
  return{
    type:actionType.ALERT_DILOG_CLOSE
  }
}
export const delConfBOpen=(ItemId)=>{
  return{
    type:actionType.DEL_CONF_B_OPEN,
    ItemId
  }
}
export const delConfBClose=()=>{
  return{
    type:actionType.DEL_CONF_B_CLOSE
  }
}
export const deleteItemFromCart=(ItemId)=>{
  return (dispatch)=>{
    const userToke = getUserToken()
    axios({
        method:'delete',
        url:Url+"/CartAndWishList/DeleteCartItem?itemId="+ItemId,
        headers:{
            'Authorization':`Beares ${userToke}`,
            'Content-Type': 'application/json'  
        }
    }).then(
        res=>{
           dispatch(getNoOfWishItem());
           dispatch(getNoOfCartItem());
           dispatch(getCarttems());
           dispatch(alertDiologClose());
           dispatch(delConfBClose());
        }
    ).catch(
        err=>console.log(err)
    )
}
}

