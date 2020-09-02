import * as actionType from "./actionTypes";

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

export const alertDiologOpen=()=>{
  return{
    type:actionType.ALERT_DILOG_OPEN
  }
}
export const alertDiologClose=()=>{
  return{
    type:actionType.ALERT_DILOG_CLOSE
  }
}