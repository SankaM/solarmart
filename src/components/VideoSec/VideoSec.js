import React from 'react';
import Aux from '../../hoc/Wrap';
import VideoS from '../Style/VideoSec.css';

const  VideoSec =(props) =>{
    return(
        <Aux>
            <div className={VideoS.vContainer}>
                <div className="row" id={VideoS.vsec}>
                    <div className="col-6">
                        <iframe width="560" height="315"style={{
                            margin:"10px 40px"
                             }}src="https://www.youtube.com/embed/lJDCIp3udc4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                             title="My video"
                             allowfullscreen></iframe>
                    </div>
                   <div className="col-6">
                        <h2 className="mt-2">{props.product.ProModel} {props.product.ProBrand} ({props.product.ProColor})</h2>
                        <div className="row">
                          <div className="col-6">
                            <ol>
                             <li>{props.product.FeatureOne}</li>
                             <li>{props.product.FeatureTwo}</li>
                             <li>{props.product.FeatureThree}</li>
                            </ol>
                          </div>
                          <div className="col-6">
                            <ol>
                             <li>{props.product.FeatureFour}</li>
                             <li>{props.product.FeatureFive}</li>
                             <li>{props.product.FeatureSix}</li>
                            </ol>
                          </div>
                        </div>
                        <div className="mt-1">
                            <span className={VideoS.newPrice}>Rs : {props.product.SellPrice}</span><span className={VideoS.pastPrice}></span>
                        </div>
                        <div>
                            <label>Quatity</label>{"   "}
                            <input type="text" id="quatity" />
                        </div>
                        <diV className="row mt-5">
                            <div className="col-6">
                                <a id={VideoS.btnAddChart} href="#section">Add to Chart</a>
                            </div>
                            <div className="col-6">
                                <a id={VideoS.btnBuy}  href="#section" >Buy Now</a>
                            </div>
                        </diV>                      
                   </div>
                </div>
            </div>
        </Aux>
    )
}
export default VideoSec;