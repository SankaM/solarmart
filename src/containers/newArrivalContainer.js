import React,{useEffect,useState} from "react";
import {Url} from "../Helpers/Jwt";
import NewArriCard from "../components/Card/NewArriCard";
import Aux from '../hoc/Wrap';
import axios from 'axios';

const NewArrival = () => {
const [newArrival,setNewArrival] = useState([]);
useEffect(()=>{
    getNewArrCardDeta()
},[])
const getNewArrCardDeta=()=>{
    axios({
        method:"GET",
        url:Url+"/Home/getNewArrivelItem"
    }).then(
        res=>{
            setNewArrival(res.data);
        }
    ).catch(
        err=>console.log(err)
    )
}
  return (
   <Aux>
    {
        newArrival && (
            newArrival.map(crd=><NewArriCard
                proPrice={crd.Act_SellPrice}
                proModel={crd.ProModel}
                proBrand={crd.ProBrand}
                proName={crd.productname}
                proImg={crd.ImgName}
                proId={crd.ProductId}
                key={crd.ProductId}
                iwidth="188px"
                iheight="168px"
                cwidth ="199px"
                cheight="270px"
              />)
        )
    }
   </Aux>
  )
};
export default NewArrival;
