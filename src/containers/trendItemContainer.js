import React,{useEffect,useState} from "react";
import {Url} from "../Helpers/Jwt";
import NewArriCard from "../components/Card/NewArriCard";
import Aux from '../hoc/Wrap';
import axios from 'axios';

const TrendItemContainer = () => {
const [TrendItem,setTrendItem] = useState([]);
useEffect(()=>{
    getNewArrCardDeta();
},[])
const getNewArrCardDeta=()=>{
    axios({
        method:"GET",
        url:Url+"/Home/getTrendingItem"
    }).then(
        res=>{
            setTrendItem(res.data);
        }
    ).catch(
        err=>console.log(err)
    )
}
  return (
   <Aux>
    {
        TrendItem && (
            TrendItem.map(crd=><NewArriCard
                proPrice={crd.Act_SellPrice}
                proModel={crd.ProModel}
                proBrand={crd.ProBrand}
                proName={crd.productname}
                proImg={crd.ImgName}
                proId={crd.ProductId}
                key={crd.ProductId}
                iwidth="210px"
                iheight="185px"
                cwidth ="220px"
                cheight="285px"
              />)
        )
    }
   </Aux>
  )
};
export default TrendItemContainer;
