import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import CardSec from "../containers/cardContainer";
import Category from "../components/Category/Category";
import Home from "../components/Style/Home.css";
import Nav from "../components/Style/Layout.css";
import { connect } from "react-redux";
import * as collectionAcc from "../store/actions/indexAcc";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Prange from "../components/PriceRange/PriceRange";
//import { withRouter } from "react-router-dom";
//import Paper from "@material-ui/core/Paper";

class Index extends Component {
  componentWillMount() {
    this.props.setFilter(
      this.props.match.params.mcid,
      this.props.match.params.scid
    );
    this.getItems();
  }

  getItems=()=>{
    if (this.props.match.params.scid === "0") {
      this.props.getCatRize1Product(this.props.match.params.mcid);
    } else {
      this.props.getCatRize2Product(this.props.match.params.scid);
    }
    this.props.setPriceTag('','')
  }
  render() {
    return (
      <div>
        <Layout>
          <div className={Nav.main_heading}>World best market place</div>
          <div className={Home.homeContainer}>
            <div className={Home.sideContainer}>
              <Category width="90%" margin="10px" />
              <Prange
                McId={this.props.match.params.mcid}
                ScId={this.props.match.params.scid}
              />
            </div>
            <div className={Home.CardContainer}>
              <h3 className={Home.mainCatName}>
                {this.props.selected_Main_CatoName}
              </h3>
              <div className={Home.subCatNavigation}>
                {this.props.Selected_subCats.map((cato) => (
                  <Button
                    variant="outlined"
                    color="primary"
                    href={
                      "/collection/" +
                      this.props.match.params.mcid +
                      "/" +
                      cato.SubCatId
                    }
                    className={Home.subCatBtn}
                  >
                    {cato.SubCatName}
                  </Button>
                ))}
              </div>
              {(this.props.filter_Sub_cat !== null ||
                this.props.min !== "" ||
                this.props.max !== "") && (
                <div className={Home.filterOptions}>
                  <span className={Home.filterSpan}>Filtered by</span>
                  {this.props.filter_Sub_cat && (
                    <Chip
                      label={"Brand : " + this.props.filter_Sub_cat.SubCatName}
                      variant="outlined"
                      size="small"
                      style={{margin:"0 8px"}}
                      onDelete={(e) =>
                        (window.location.href =
                          "/collection/" +
                          this.props.match.params.mcid +
                          "/" +
                          0)
                      }
                    />
                  )}
                  {(this.props.min !== "") & (this.props.max === "") ? (
                    <Chip
                      label={"Price : "+ this.props.min +" - "}
                      variant="outlined"
                      size="small"
                      style={{margin:"0 8px"}}
                      onDelete={()=>this.getItems()}
                    />
                  ):null}
                  {(this.props.min === "") & (this.props.max !== "") ? (
                    <Chip
                      label={"Price : 0 - "+ this.props.max}
                      variant="outlined"
                      size="small"
                      style={{margin:"0 8px"}}
                      onDelete={()=>this.getItems()}
                    />
                  ):null}
                  {(this.props.min !== "") & (this.props.max !== "") ? (
                    <Chip
                      label={"Price : " + this.props.min +" - " + this.props.max}
                      variant="outlined"
                      size="small"
                      style={{margin:"0 8px"}}
                      onDelete={()=>this.getItems()}
                    />
                  ):null}
                </div>
              )}
              <CardSec />
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    catgrs: state.colr.cato,
    selected_Main_CatoName: state.colr.selected_Main_CatoName,
    Selected_subCats: state.colr.Selected_subCats,
    filter_Sub_cat: state.colr.filter_Sub_cat,
    min: state.colr.min,
    max: state.colr.max,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getCatRize2Product: (id) => dispatch(collectionAcc.getCatRize2Product(id)),
    getCatRize1Product: (id) => dispatch(collectionAcc.getCatRize1Product(id)),
    setFilter: (mid, cid) => dispatch(collectionAcc.setFilter(mid, cid)),
    setPriceTag: (mid, cid) => dispatch(collectionAcc.setPriceTag(mid, cid)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Index);
