import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import CardSec from "../containers/cardContainer";
import Category from "../components/Category/Category";
import Home from "../components/Style/Home.css";
import  Nav from '../components/Style/Layout.css';
import {connect} from 'react-redux';
import * as collectionAcc from '../store/actions/indexAcc'; 
//import Prange from "../components/PriceRange/PriceRange";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CategoryNo: 0,
      CategoryName: null,
      max:0,
      min:0,
      showPriceRange:false,
      catId:0
    };
  }
componentWillMount(){
  this.props.getCatRizeProduct(this.props.match.params.cid)
}
  // cardCantentHandler = (no,name,e) => {
  //   e.preventDefault();
  //   this.setState({
  //     CategoryNo: no,
  //     CategoryName: name,
  //   });
  // };

  render() {
    return (
      <div>
        <Layout>
        <div className={Nav.main_heading}>
            World best  market place
        </div>
          <div className={Home.homeContainer}>
            <div className={Home.sideContainer}>
              <Category/>
            </div>
            <div className={Home.CardContainer}>
              <CardSec/>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Products:state.colr.product
  };
};

const mapDispathToProps =(dispatch)=>{
  return{
    getCatRizeProduct:(id)=>dispatch(collectionAcc.getCatRizeProduct(id))
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Index);
