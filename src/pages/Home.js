import React, { Component } from "react";
import * as hommAccc from "../store/actions/indexAcc";
import { Url, getUserToken } from "../Helpers/Jwt";
import Layout from "../components/Layout/Layout";
import home from "../components/Style/Home.css";
import Nav from "../components/Style/Layout.css";
import Category from "../components/Category/HomeCategory";
import TopAds from '../components/HomeComp/Topads';
import NewArrivels from '../containers/newArrivalContainer';

class Home extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <div className={Nav.main_heading}>World best market place</div>
        <div className={home.catoAndPrmoWrap}>
            <div className={home.catoAndPrmoSec}>
                <div className={home.catoSec}>
                    <Category/>
                </div>
                <div className={home.pramoAd}>
                    <TopAds/>
                </div>
            </div>
            <div className={home.newArrSec}>
            <h4 className={home.newArrHead}>New Arrivals</h4>
            <div className={home.newArrContainer}>
              <NewArrivels/>
            </div>
            </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
