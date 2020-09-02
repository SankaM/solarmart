import * as actionTypes from "./actionTypes";
import axios from "axios";
import {Url,getUserToken} from '../../Helpers/Jwt';
import {setSankBar,getNoOfWishItem} from './indexAcc';

export const loginModOpen = () => {
  return {
    type: actionTypes.LOGMODOPEN,
  };
};
export const loginModClose = () => {
  return {
    type: actionTypes.LOGMODCLOSE,
  };
};
export const regUserModOpen = () => {
  return {
    type: actionTypes.REGUSEROPEN,
  };
};
export const regUserModClose = () => {
  return {
    type: actionTypes.REGUSERCLOSE,
  };
};
export const regUserModCloseInLog = () => {
  return {
    type: actionTypes.REGUSERINLOG,
  };
};

export const is_Userlogin = () => {
  return {
    type: actionTypes.IS_USERLOGIN,
  };
};
export const Userlogout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

export const getUsercToken = () => {
  return {
    type: actionTypes.USER_LOGIN,
  };
};

export const userStartLog=()=>{
  return{
    type:actionTypes.USER_START_LOGIN
  }
}

export const USerlogin = (email, password) => {
  return (dispatch) => {
    dispatch(userStartLog());
    axios
      .get(
        Url+"/Account/ValidUserLogin?email=" +
          email +
          "&password=" +
          password
      )
      .then((res) => {
        localStorage.setItem("SolrMUt", res.data);
        dispatch(getUsercToken());
        dispatch(loginModClose());
        dispatch(getCurrentUserName());
        dispatch(getNoOfWishItem());
        dispatch(setSankBar(true,"success","successfully logged in"));
      })
      .catch((error) => {
        dispatch(setSankBar(true,"error",error.message));
        dispatch(loginModClose());
      });
  };
};

export const updateCurrentUser =(name)=>{
  return{
    type:actionTypes.UPDATE_CURRENTUSER,
    name
  }
}

export const getCurrentUserName=()=>{
  return (dispatch)=>{
    const currUserToken = getUserToken();
    console.log("uuu"+currUserToken)
    axios.get(Url+"/Account/CurrentUsername",{
      headers:{
        'Authorization':`Beares ${currUserToken}`
      }
    }).then(
      userName=>
      dispatch(updateCurrentUser(userName.data))
    ).catch(err=>console.log(err))
  }
}
