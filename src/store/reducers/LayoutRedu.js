import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  registerModShow: false,
  loginModShow: false,
  userLogin: false,
  userLoginSpiner:false,
  currentUserName:null,
  loginError:""
};

const is_UserLogin = (state, action) => {
  const user = localStorage.getItem("SolrMUt");
  if (user) {
    return updateObject(state, { userLogin: true });
  }
  return state;
};
const userLogout = (state, action) => {
  localStorage.removeItem("SolrMUt");
  return updateObject(state, { userLogin: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.REGUSEROPEN:
      return updateObject(state, { registerModShow: true });
    case actionType.REGUSERCLOSE:
      return updateObject(state,{registerModShow: false})
    case actionType.REGUSERINLOG:
      return updateObject(state,{loginModShow: false,registerModShow: true})
    case actionType.LOGMODOPEN:
      return updateObject(state,{loginModShow: true})
    case actionType.LOGMODCLOSE:
      return updateObject(state,{loginModShow: false})
    case actionType.IS_USERLOGIN:
      return is_UserLogin(state, action);
    case actionType.USER_LOGOUT:
      return userLogout(state, action);
    case actionType.USER_LOGIN:
      return updateObject(state, {userLogin:true,userLoginSpiner:false});
    case actionType.USER_START_LOGIN:
      return updateObject(state, {userLoginSpiner:true});
    case actionType.UPDATE_CURRENTUSER:
      return updateObject(state, {currentUserName:action.name});
    case actionType.CREDENTIALSINVALID:
      return updateObject(state, {userLoginSpiner:false,loginError:"Username or password is invalid"});
    case actionType.CLEAREERRMSG:
      return updateObject(state, {loginError:"  "});
    default:
      return state;
  }
  //return state;
};

export default reducer;
