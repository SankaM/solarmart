import * as actionType from "../actions/actionTypes";

const initialState ={
    product:[]
}

const reducer =(state = initialState,action)=>{
    switch (action.type) {
        case actionType.GET_CATRIZE_PROD:
            return{
                ...state,
                product:action.prod
            }
        default:
            return state;
    }
}
export default reducer;