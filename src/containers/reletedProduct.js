import React,{useEffect,useState} from "react";
import {Url} from "../Helpers/Jwt";
import NewArriCard from "../components/Card/NewArriCard";
import Aux from '../hoc/Wrap';
import axios from 'axios';

const RelatedItem = (props) => {
const [relatedProd,setRelatedItem] = useState([]);
useEffect(()=>{
    getNewArrCardDeta(props.PId)
},[props.PId])
const getNewArrCardDeta=(id)=>{
    axios({
        method:"GET",
        url:Url+"/Product/GetRelatedItem?id="+id
    }).then(
        res=>{
            setRelatedItem(res.data);
        }
    ).catch(
        err=>console.log(err)
    )
}
  return (
   <Aux>
    {
        relatedProd && (
            relatedProd.map(crd=><NewArriCard
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
export default RelatedItem;