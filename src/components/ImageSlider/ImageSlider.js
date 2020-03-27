import React,{Component} from 'react';
import  Aux from '../../hoc/Wrap';
import SimpleImageSlider from "react-simple-image-slider";
import Slider from '../Style/slider.css';
//import Images from '../../Assets/null.png';


class ImgSlaider extends Component {
    render(){
      const images = [
        { url: "../../Assets/null.png" },
        { url: "/static/media/null2.0788e1bb.jpeg" },
        { url: "/static/media/null3.7fea16e7.jpg" },
        { url: "/static/media/null.12e1ec8c.png" },
    ];

        return(
          <Aux>
            <div className={Slider.sliderContainer}>
                <SimpleImageSlider
                      width={800}
                      height={404}
                      images={images}
                      />
                      {/* <img src={Images} alt=""></img> */}
            </div>
          </Aux>
        );
    }
}
                
export default ImgSlaider;