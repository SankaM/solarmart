import React,{useState} from 'react';
import Aux from '../../hoc/Wrap';
import Pslider from '../Style/pSlider.css';

const PriceRange=(props)=>{
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(0);
    return(
        <Aux>
            <div className={Pslider.sliderContainer}>
                <h5 className={Pslider.sliderHader}>Price</h5>
                <input type="number" min="0" placeholder="Min"  className={Pslider.rangeInput} 
                onChange={(e)=>setMin(e.target.value)}/>  
                <div className={Pslider.dash}>-</div>
                <input type="number" min="0" placeholder="Max"  className={Pslider.rangeInput}
                onChange={(e)=>setMax(e.target.value)}/>  
                <a href="#/" className={Pslider.sliderBtn} onClick={(e)=>props.getPriceRange(min,max,e)}>x</a>
            </div>
        </Aux>
    )
}
export default PriceRange;