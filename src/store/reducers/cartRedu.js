import * as actionType from "../actions/actionTypes";

const initialState ={
    cardItems:[]
}

const cartReduser=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.UPDATE_CARTITEM:
            return{
                ...state,
                cardItems:action.cartItem
            }
        default:
            return state;
    }
}
export default cartReduser;