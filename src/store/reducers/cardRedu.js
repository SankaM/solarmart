import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState ={
    noOfWishListItem:0
}

const cardRedu =(state=initialState,action)=>{
    switch(action.type){
        case actionType.UPDATE_WISHLIST:
            return updateObject(state,{noOfWishListItem:action.no});
        default:
            return state;
    }
}

export default cardRedu;