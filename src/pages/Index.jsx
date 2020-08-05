import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import CardSec from "../containers/cardContainer";
import Category from "../components/Category/Category";
import Home from "../components/Style/Home.css";
import  Nav from '../components/Style/Layout.css';
import Prange from "../components/PriceRange/PriceRange";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CategoryNo: 0,
      CategoryName: null,
      max:0,
      min:0,
      showPriceRange:false
    };
  }

  cardCantentHandler = (no,name,e) => {
    e.preventDefault();
    this.setState({
      CategoryNo: no,
      CategoryName: name,
    });
  };

  showPriceRangeHandler=(length)=>{
    let show = false;
    if(length !== 0){
      show = true;
    }
    this.setState({
      showPriceRange:show
    })
  }

  getPriceRange = (min,max,e) => {
    e.preventDefault();
    let maxNumber = parseInt(max);
    let minNumber = parseInt(min);
    isNaN(maxNumber) && (maxNumber = 0 );
    isNaN(minNumber) && (minNumber = 0 );
    this.setState({
      max:maxNumber,
      min:minNumber
    })
  };

  render() {
    return (
      <div>
        <Layout goHome={this.cardCantentHandler}>
        <div className={Nav.main_heading}>
            World best  market place
        </div>
          <div className={Home.homeContainer}>
            <div className={Home.sideContainer}>
              <Category cardContent={this.cardCantentHandler} />
              {this.state.showPriceRange && <Prange getPriceRange={this.getPriceRange} />}
            </div>
            <div className={Home.CardContainer}>
              <CardSec
                contentId={this.state.CategoryNo}
                CategoryName={this.state.CategoryName}
                showPriceRangeHandler={this.showPriceRangeHandler}
                max={this.state.max}
                min={this.state.min}
              />
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default Index;
