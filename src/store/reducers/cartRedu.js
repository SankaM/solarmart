import * as actionType from "../actions/actionTypes";

const initialState = {
  cardItems: [],
  confirmedOrderItems: [],
  userInfo: {
    fname: "",
    lname: "",
    email: "",
    address: {
      line1: "",
      line2: null,
      city: "",
      state: "",
      country: "",
      postal_code: null,
    },
    mobile: null,
  },
};

const cartReduser = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_CARTITEM:
      return {
        ...state,
        cardItems: action.cartItem,
      };
    case actionType.UPDATE_CONFIRMED_ORDER:
      return {
        ...state,
        confirmedOrderItems: action.confirmedOrder,
      };
    case actionType.SETUSER_INFO:
      return {
        ...state,
        userInfo: {
            fname: action.info[0].FirstName,
            lname:action.info[0].LastName,
            email:action.info[0].Email,
            address: {
              line1:action.info[0].Address,
              line2:"",
              city: "",
              state: "",
              country: "",
              postal_code: null,
            },
            mobile: action.info[0].ContactNo,
        },
      };
      case actionType.CHANGE_SHIPDETAILS:
          return{
              ...state,
              userInfo:{
                fname: action.newInfo.fname,
                lname: action.newInfo.lname,
                email: action.newInfo.email,
                address: {
                  line1: action.newInfo.addrLine1,
                  line2: action.newInfo.addrLine2,
                  city: action.newInfo.city,
                  state: action.newInfo.state,
                  country: action.newInfo.country,
                  postal_code: action.newInfo.zip,
                },
                mobile: action.newInfo.phoNo,
              }
          }
    default:
      return state;
  }
};
export default cartReduser;
