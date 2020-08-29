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
