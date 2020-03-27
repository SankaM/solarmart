import React from 'react';
import Aux from '../../hoc/Wrap'
import Card from '../Style/Card.css'

const card = ()=>{
   
   return(
    <Aux>
        <div className={Card.cardWraper}> 
            <div className={Card.CImgSec}>
                
            </div>
            <div className={Card.priceWraper}><span className={Card.price}>Rs: 250.00</span></div>
            <div className={Card.cardMidle}>
                <div className={Card.starRatnig}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <span className={Card.percentage}>-15%</span>
            </div>
            <div className={Card.ItemNameWraper}><span className={Card.ItemName}>Smart wache</span></div>
        </div>
    </Aux> 
    )
}
export default card;