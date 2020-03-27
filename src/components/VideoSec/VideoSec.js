import React from 'react';
import Aux from '../../hoc/Wrap';
import VideoS from '../Style/VideoSec.css';

const  VideoSec =() =>{
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
                        <h2 className="mt-2">Casio G-SHOCK - GA-100CM-4ADR</h2>
                        <div className="mt-5">
                            <span className={VideoS.newPrice}>$24.16</span><span className={VideoS.pastPrice}>$30.15</span>
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