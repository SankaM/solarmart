import React from "react";
import Aux from "../../hoc/Wrap";
import Carousel from "react-bootstrap/Carousel";
import ImgStyle from "../Style/ImgSlider.css";
import SliderImage from 'react-zoom-slider';

const ImgSlaider = (props) => {
  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };
  

  return (
    <Aux>
      <div className={ImgStyle.sliderContainer}>
        { props.ImgList.length !== 0 && <SliderImage
          data={props.ImgList}
          width="500px" 
          showDescription={true} 
          direction="right"
        />}
      </div>
    </Aux>
  );
};

export default ImgSlaider;
// <Carousel activeIndex={index} onSelect={handleSelect} className={ImgStyle.slider} data-interval="false">
//           {props.ImgList.map((url) => (
//             <Carousel.Item key={url.ImgName}>
//               <img
//                 className={ImgStyle.siderImg}
//                 src={"http://localhost:56482/Images/" + url.ImgName}
//                 alt={url.ImgName}
//               />
//               {/* <Carousel.Caption>
//                 <h3>First slide label</h3>
//                 <p>
//                   Nulla vitae elit libero, a pharetra augue mollis interdum.
//                 </p>
//               </Carousel.Caption> */}
//             </Carousel.Item>
//           ))}
//         </Carousel>