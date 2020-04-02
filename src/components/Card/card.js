import React from 'react';
import Aux from '../../hoc/Wrap'
import Card from '../Style/Card.css'

const card = (props)=>{
   
   return(
    <Aux>
        <div className={Card.cardWraper}> 
            <div className={Card.CImgSec}>
                
            </div>
            <div className={Card.priceWraper}><span className={Card.price}>Rs:{ props.proPrice}</span></div>
            <div className={Card.cardMidle}>
                {/* <div className={Card.starRatnig}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
   </div> */}
                <span className={Card.Model}>{ props.proModel }</span>
            </div>
            <div className={Card.ItemNameWraper}><span className={Card.ItemName}>{[props.proBrand,props.proName].join(' ') }</span></div>
        </div>
    </Aux> 
    )
}
export default card;