import * as actionTypes from './actionTypes';
import axios from 'axios';
import {Url,getUserToken} from '../../Helpers/Jwt';
import {setSankBar} from './indexAcc';

export const updateWishList=(no)=>{
    return{
        type:actionTypes.UPDATE_WISHLIST,
        no
    }
}
export const getNoOfWishItem=()=>{
    return (dispatch)=>{
        const userToke = getUserToken();
        axios({
            method:'GET',
            url:Url+"/CartAndWishList/GetNoOfWishItem",
            headers:{
                'Authorization':`Beares ${userToke}`,
                'Content-Type': 'application/json'  
            }
        }).then(res=>dispatch(updateWishList(res.data))).catch(
            err=>console.log(err)
        )
    }
}

export const addItemToWishList=(IsUserExist,id)=>{
    if(IsUserExist){
        return (dispatch)=>{
            const userToke = getUserToken()
            axios({
                method:'post',
                url:Url+"/CartAndWishList/UpdateWishList?prodId="+id,
                headers:{
                    'Authorization':`Beares ${userToke}`,
                    'Content-Type': 'application/json'  
                }
            }).then(
                res=>{
                    dispatch(setSankBar(true,"success",res.data))
                    dispatch(getNoOfWishItem())
                }
            ).catch(
                err=>dispatch(setSankBar(true,"error",err.message))
            )
        }
    }
    else return (dispatch)=>{
        alert("please login first")
    }
}