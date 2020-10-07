import React from "react";
import Aux from "../../hoc/Wrap";
import ImgStyle from "../Style/ImgSlider.css";
import SliderImage from 'react-zoom-slider';

const ImgSlaider = (props) => {
  return (
    <Aux>
      <div className={ImgStyle.sliderContainer}>
        { props.ImgList.length !== 0 && <SliderImage
          data={props.ImgList}
          width="390px" 
          showDescription={true} 
          direction="right"
        />}
      </div>
    </Aux>
  );
};

export default ImgSlaider;
