import React,{useState} from 'react';
import Aux from '../../hoc/Wrap';
import Pslider from '../Style/pSlider.css';
import * as collAcc from '../../store/actions/indexAcc';
import rArrow  from '../../Assets/rightArrow.png';

import {useDispatch} from "react-redux";
const PriceRange=(props)=>{
    const [min,setMin] = useState('');
    const [max,setMax] = useState('');
    const dispatch = useDispatch();
    return(
        <Aux>
            <div className={Pslider.sliderContainer}>
                <h5 className={Pslider.sliderHader}>Price</h5>
                <input type="number" min="0" placeholder="Min"  className={Pslider.rangeInput} 
                onChange={(e)=>setMin(e.target.value)}/>  
                <div className={Pslider.dash}>-</div>
                <input type="number" min="0" placeholder="Max" className={Pslider.rangeInput}
                onChange={(e)=>setMax(e.target.value)}/>  
                <a href="#/" className={Pslider.sliderBtn} onClick={()=>dispatch(collAcc.getProductAcordingPrice(min,max,props.McId,props.ScId))}>
                    <img src={rArrow} className={Pslider.rArrow} alt="arrow Btn"/>
                </a>
            </div>
        </Aux>
    )
}
export default PriceRange;