import * as actionType from "../actions/actionTypes";

const initialState ={
    product:[],
    cato:[],
    selected_Main_CatoName:"",
    Selected_subCats:[],
    filter_Sub_cat:"",
    min:'',
    max:''
}

const reducer =(state = initialState,action)=>{
    switch (action.type) {
        case actionType.GET_CATRIZE_PROD:
            return{
                ...state,
                product:action.prod
            }
        case actionType.GETCATEGORIES:
            return{
                ...state,
                cato:action.cato
            }
        case actionType.SETFILTERS:
            return{
                ...state,
                selected_Main_CatoName:action.selected_Main_CatoName,
                Selected_subCats:action.Selected_subCats,
                filter_Sub_cat:action.filter_Sub_cat
            }
        case actionType.SETPRICETAG:
            return{
                ...state,
                max:action.max,
                min:action.min
            }
        default:
            return state;
    }
}
export default reducer;