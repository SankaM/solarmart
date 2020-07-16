import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import Fcard from "../containers/feturedItem";
import Category from "../components/Category/Category";
import Home from "../components/Style/Home.css";

class Index extends Component {
  render() {
    return (
      <div>
        <Layout>
          <div className={Home.homeContainer}>
            <div className={Home.sideContainer}>
              <Category />
            </div>
            <div className={Home.CardContainer}>
              <Fcard />
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default Index;
