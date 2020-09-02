import * as actionType from "../actions/actionTypes";

const initialState ={
    snakbarOpen:false,
    snakbarType:"success",
    snakbarMessage:"",
    alertDilogOpen:false
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
        case actionType.ALERT_DILOG_OPEN:
            return{
                ...state,
                alertDilogOpen:true
            }
        case actionType.ALERT_DILOG_CLOSE:
            return{
                ...state,
                alertDilogOpen:false
            }
        default :
            return state
    }
}

export default snakbarRedu;