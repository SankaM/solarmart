import React, { useState } from "react";
import Aux from "../../hoc/Wrap";
import { Carousel } from "react-bootstrap";
import home from '../Style/Home.css';
import Ing1 from "../../Assets/aboutUsImg.jpg";
import Ing2 from "../../Assets/home5.jpg";

const TopAds = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Aux>
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item className={home.adImgWrap}>
            <img className={["d-block w-100",home.adImg].join(" ")} src={Ing1} alt="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item  className={home.adImgWrap}>
            <img className={["d-block w-100",home.adImg].join(" ")} src={Ing2} alt="Second slide" />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Aux>
  );
};
export default TopAds;
