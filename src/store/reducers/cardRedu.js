import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState ={
    noOfWishListItem:0,
    noOfCartItem:0,
}

const cardRedu =(state=initialState,action)=>{
    switch(action.type){
        case actionType.UPDATE_WISHLIST:
            return updateObject(state,{noOfWishListItem:action.no});
        case actionType.UPDATE_CART:
            return updateObject(state,{noOfCartItem:action.no})
        default:
            return state;
    }
}

export default cardRedu;