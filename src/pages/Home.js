import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import home from "../components/Style/Home.css";
import Nav from "../components/Style/Layout.css";
import Category from "../components/Category/Category";
import TopAds from "../components/HomeComp/Topads";
import NewArrivels from "../containers/newArrivalContainer";
import TrendItems from "../containers/trendItemContainer";
import homeDelivery from "../Assets/homeDelivery.jpg";
import cashOnDilivery from "../Assets/cashOnDilivery.jpg";
import payOnline from "../Assets/payOnline.jpg";

class Home extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <div className={Nav.main_heading}>World best market place</div>
        <div className={home.catoAndPrmoWrap}>
          <div className={home.catoAndPrmoSec}>
            <div className={home.catoSec}>
              <Category width="100%" margin="0px"/>
            </div>
            <div className={home.pramoAd}>
              <TopAds />
            </div>
          </div>
          <div className={home.newArrSec}>
            <h4 className={home.newArrHead}>New Arrivals</h4>
            <div className={home.newArrContainer}>
              <NewArrivels />
            </div>
          </div>
          <div className={home.trenItemSec}>
            <h4 className={home.trendHead}>Trending Products</h4>
            <div className={home.trenItmContainer}>
              <TrendItems />
            </div>
          </div>
          <div className={home.specifcationSec}>
            <div className={home.specifcation}>
              <img src={payOnline} className={home.specfImg} alt="avatar" />
              <h4 className={home.specHader}>Pay online</h4>
              <p className={home.specPara}>
                Local: http://localhost:3000/ On Your Network:
                http://192.168.137.1:3000/ Note that the development build is
                not optimized. To create a production build, use npm run build.
              </p>
            </div>
            <div className={home.specifcation}>
              <img src={cashOnDilivery} className={home.specfImg} alt="avatar" />
              <h4 className={home.specHader}>Cash on dilivery</h4>
              <p className={home.specPara}>
                Local: http://localhost:3000/ On Your Network:
                http://192.168.137.1:3000/ Note that the development build is
                not optimized. To create a production build, use npm run build.
              </p>
            </div>
            <div className={home.specifcation}>
              <img src={homeDelivery} className={home.specfImg} alt="avatar" />
              <h4 className={home.specHader}>Home dilivery</h4>
              <p className={home.specPara}>
                Local: http://localhost:3000/ On Your Network:
                http://192.168.137.1:3000/ Note that the development build is
                not optimized. To create a production build, use npm run build.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
