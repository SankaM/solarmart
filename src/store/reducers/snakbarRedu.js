import * as actionType from "../actions/actionTypes";

const initialState ={
    snakbarOpen:false,
    snakbarType:"success",
    snakbarMessage:"",
    alertDilogOpen:false,
    delConfBoxOpen:false,
    movedItemId:null,
    deleteCrtId:null
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
                alertDilogOpen:true,
                movedItemId:action.ItemId
            }
        case actionType.ALERT_DILOG_CLOSE:
            return{
                ...state,
                alertDilogOpen:false
            }
        case actionType.DEL_CONF_B_OPEN:
            return{
                ...state,
                delConfBoxOpen:true,
                deleteCrtId:action.ItemId
            }
        case actionType.DEL_CONF_B_CLOSE:
            return{
                ...state,
                delConfBoxOpen:false,
            }
        default :
            return state
    }
}

export default snakbarRedu;