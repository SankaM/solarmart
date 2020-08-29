import * as actionType from "../actions/actionTypes";

const initialState ={
    snakbarOpen:false,
    snakbarType:"success",
    snakbarMessage:""
}

const snakbarRedu =(state=initialState,action)=>{
    switch (action.type) {
        case actionType.SET_SNAKBAR:
            return{
                ...state,
                snakbarOpen:action.snakbarOpen,
                snakbarType:action.snakbarType,
                snakbarMessage:action.snakbarMessage
            }
        default :
            return state
    }
}

export default snakbarRedu;