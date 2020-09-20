import React, { useState, useEffect } from "react";
import Aux from "../hoc/Wrap";
import OrCss from "../components/Style/order.css";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { getUserToken, Url } from "../Helpers/Jwt";
import { Table } from "react-bootstrap";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const Order = () => {
  const [expanded, setExpanded] = useState(false);
  const [orderDe, setorderDe] = useState([]);
  const [orderedItem, setorderedItem] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    getOrderDetils();
  }, []);

  const getOrderDetils = () => {
    const user = getUserToken();
    axios({
      method: "GET",
      url: Url + "/Order/getMyOrederDetails",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beares ${user}`,
      },
    })
      .then((res) => setorderDe(res.data))
      .catch((err) => console.log(err));
  };

  const getOderProdList = (ord_id) => {
    axios({
      method: "GET",
      url: Url + "/Order/getOrderedItems?ord_id=" + ord_id,
    }).then((res) => setorderedItem(res.data));
  };
  return (
    <Aux>
      <Layout>
        <div className={OrCss.OrderContiner}>
          <h3 className={[OrCss.center,OrCss.OrMHed].join(" ")}>My Orders</h3>
          {orderDe &&
            orderDe.map((ord, index) => (
              <Accordion
                expanded={expanded === "panel" + index}
                onChange={handleChange("panel" + index)}
                onClick={() => getOderProdList(ord.order_id)}
                key={ord.order_id}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                >
                  <Typography className={[OrCss.SubHed,OrCss.center].join(" ")}>
                    <span className={OrCss.dthed}>Placed on </span>
                    <span className={OrCss.dt}>{ord.Date} </span>
                    <span className={OrCss.dt}>{ord.time}</span>
                  </Typography>
                  <Typography className={[OrCss.SubHed,OrCss.center].join(" ")}>
                    <span className={OrCss.dthed}>Amount : Rs </span><sapn className={OrCss.amount}>{ord.total_amount}</sapn>
                  </Typography>
                  <Typography className={[OrCss.SubHed,OrCss.center].join(" ")}><span className={OrCss.suc}>Successed</span></Typography>
                </AccordionSummary>
                {orderedItem && (
                  <AccordionDetails>
                    <div className="col-9">
                      <div className={OrCss.OrItemWrp}>
                        <Table>
                          <tbody>
                            {orderedItem.map((item) => (
                              <tr key={item.prod_Id}>
                                <td>
                                  <img
                                    src={
                                      "http://localhost:56482/Images/" +
                                      item.ImgName
                                    }
                                    alt={item.ImgName}
                                    className={OrCss.orImg}
                                  />
                                </td>
                                <td>
                                  <span>
                                    {item.ProBrand} {item.ProModel}{" "}
                                    {item.productname}{" "}
                                  </span>
                                </td>
                                <td>
                                  <sapn>RS : {item.SellPrice} /=</sapn>
                                </td>
                                <td>
                                  <span>Qty : {item.quntity}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className={OrCss.addWrap}>
                        <h5
                          className={[OrCss.center, OrCss.addHader].join(" ")}
                        >
                          Shipping Address
                        </h5>
                        <span className={OrCss.addspn}>{ord.first_name}</span>{" "}
                        <span className={OrCss.addspn}>{ord.last_name}</span>
                        <br />
                        <span className={OrCss.addspn}>{ord.address_line1}</span>
                        <br />
                        {ord.address_line2 && (
                          <Aux>
                            <span className={OrCss.addspn}>{ord.address_line2}</span>
                            <br />
                          </Aux>
                        )}
                        <span className={OrCss.addspn}>{ord.city}</span>
                        <br />
                        <span className={OrCss.addspn}>{ord.state}</span>
                        <br />
                        <span className={OrCss.addspn}>{ord.country}</span>
                        <br />
                      </div>
                    </div>
                  </AccordionDetails>
                )}
              </Accordion>
            ))}
        </div>
      </Layout>
    </Aux>
  );
};
export default Order;
