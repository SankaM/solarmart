import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Table } from "react-bootstrap";
import { Url, getUserToken } from "../Helpers/Jwt";
import chOutcss from "../components/Style/checkOut.css";
import Aux from "../hoc/Wrap";
import Button from "@material-ui/core/Button";
import Layout from "../components/Layout/Layout";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { v1 as uuidv1 } from "uuid";
import CrdImg from "../Assets/cardImg.png";
import AdrsChang from "../components/PaymentCom/changeAddress";
import PaySucMg from '../components/PaymentCom/PaySucsMg';
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "../store/actions/indexAcc";

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [order, setClearOrder] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [total, setTotal] = useState(null);
  const [adrsChage, setAdrsChage] = useState(false);
  const [paySucMg, setpaySucMg] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    fname: "",
    lanme: "",
    email: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      postal_code: null,
    },
    mobile: null,
  });
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const userInfoNew = useSelector((state) => state.ctr.userInfo);

  const adrsChangeShow = () => setAdrsChage(true);
  const adrsChangeClose = () => setAdrsChage(false);

  const paySuccMgShow = () => setpaySucMg(true);
  const paySuccMgClose = () => setpaySucMg(false);
  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("orderDetails"));
    const total = localStorage.getItem("orderTotal");

    axios({
      method: "post",
      url: Url + "/Payment/PaymentIntent",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        items: [
          { id: "xl-tshirt", price: 520 },
          { id: "xl-sHORT", price: 987 },
        ],
        amount: total,
      }),
    }).then((res) => {
      setClientSecret(res.data);
    });

    setClearOrder(order);
    setTotal(total);

    const user = getUserToken();
    axios({
      method: "GET",
      url: Url + "/Payment/GetUserInfoForBill",
      headers: {
        Authorization: `Beares ${user}`,
        "Content-Type": "application/json",
      },
    })
      .then((info) => {
        setUserInfo(info.data);
        setEditedUserInfo({
          fname: info.data[0].FirstName,
          lanme: info.data[0].LastName,
          email: info.data[0].Email,
          address: {
            line1: info.data[0].Address,
            line2: null,
            city: "",
            state: "",
            country: "",
            postal_code: null,
          },
          mobile: info.data[0].ContactNo,
        });
        dispatch(cartAction.setIniUserInfo(info.data));
      })
      .catch((err) => console.log(err.message));

    //getUserInformation();
  }, [dispatch]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {},
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    
    ev.preventDefault();
    const billingDetails = {
      email: ev.target.email.value,
      name: ev.target.fname.value + ev.target.lname.value,
      address: {
        city: "nuwara elliya",
        line1: userInfo[0].Address,
        state: "central",
        postal_code: 222000,
      },
    };

    setProcessing(true);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    if (paymentMethodReq.error) {
      console.log(paymentMethodReq.error);
    } else {
      const confirmedCardPayment = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      if (confirmedCardPayment.error) {
        setError(`Payment failed ${confirmedCardPayment.error.message}`);
        setProcessing(false);
        console.log(confirmedCardPayment.error);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        submitOrder(confirmedCardPayment.paymentIntent.id);
        console.log("con", confirmedCardPayment.paymentIntent.id);
      }
    }
  };
  const lnameHanler = (e) => {
    setEditedUserInfo({
      fname: editedUserInfo.fname,
      lanme: e.target.value,
      email: editedUserInfo.email,
      address: {
        line1: editedUserInfo.address.line1,
        line2: "",
        city: "",
        state: "",
        country: "",
        postal_code: null,
      },
      mobile: editedUserInfo.mobile,
    });
  };
  const fnameHanler = (e) => {
    setEditedUserInfo({
      fname: e.target.value,
      lanme: editedUserInfo.lanme,
      email: editedUserInfo.email,
      address: {
        line1: editedUserInfo.address.line1,
        line2: "",
        city: "",
        state: "",
        country: "",
        postal_code: null,
      },
      mobile: editedUserInfo.mobile,
    });
  };
  const emailHanler = (e) => {
    setEditedUserInfo({
      fname: e.target.value,
      lanme: editedUserInfo.lanme,
      email: e.target.value,
      address: {
        line1: editedUserInfo.address.line1,
        line2: "",
        city: "",
        state: "",
        country: "",
        postal_code: null,
      },
      mobile: editedUserInfo.mobile,
    });
  };
  const submitOrder = (payId) => {
    let orderId = uuidv1();
    const user = getUserToken();
    const ordered_Prod = [];
    let id;
    let qut;
    for (let i = 0; i < order.length; i++) {
      id = order[i].id;
      qut = order[i].quentity;
      ordered_Prod.push({
        prodId: id,
        quntity: qut,
      });
    }
    axios({
      method: "post",
      url: Url + "/Order/SubmitOrder",
      headers: {
        Authorization: `Beares ${user}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        orderId: orderId,
        fname: userInfoNew.fname,
        lname: userInfoNew.lname,
        email: userInfoNew.email,
        paymentId: payId,
        adress: {
          line1: userInfoNew.address.line1,
          line2: userInfoNew.address.line2,
          city: userInfoNew.address.city,
          state:  userInfoNew.address.state,
          country: userInfoNew.address.country,
          postal_code: userInfoNew.address.postal_code,
        },
        mobile: editedUserInfo.mobile,
        total_amount: total,
        ord_Prod: ordered_Prod,
      }),
    }).then(
      res=>{
      paySuccMgShow();
      ordered_Prod.forEach(
        item=>dispatch(cartAction.deleteItemFromCart(item.prodId))
      )
      localStorage.removeItem("orderDetails");
      localStorage.removeItem("orderTotal");
    }
    );
  };

  return (
    <Layout>
      <div className={chOutcss.chekMinContaine}>
        <div className="row">
          <div className="col-6">
            <h3 className={chOutcss.rewHader}>Review item and shipping</h3>
            <div className={chOutcss.itemList}>
              <div className="row">
                <div className="col-6">
                  <div className={chOutcss.shpAddress + " " + chOutcss.Price}>
                    <span className={chOutcss.tprice}>Rs : {total} /=</span>
                  </div>
                </div>
                <div className="col-6">
                  {editedUserInfo.length !== 0 && (
                    <div className={chOutcss.shpAddress}>
                      <span className={chOutcss.shpAdrrHader}>Ship to</span>{" "}
                      <br />
                      <span className={chOutcss.shadrrN}>
                        {userInfoNew.fname}
                      </span>{" "}
                      <span className={chOutcss.shadrrN}>
                        {userInfoNew.lname}
                      </span>{" "}
                      <span className={chOutcss.shadrr}>
                        {userInfoNew.address.line1}
                      </span>
                      {userInfoNew.address.line2  && (
                        <Aux>
                          
                          <span className={chOutcss.shadrr}>
                            {userInfoNew.address.line2}
                          </span>
  
                        </Aux>
                      )}
                      <span className={chOutcss.shadrrN}>
                        {userInfoNew.address.city}
                      </span>{" , "}
                      <span className={chOutcss.shadrrN}>
                        {userInfoNew.address.state}
                      </span>
                      <span className={chOutcss.shadrr}>
                        {userInfoNew.address.country}
                      </span>
                      <span className={chOutcss.shadrr}>
                        {userInfoNew.mobile}
                      </span>
                      <span className={chOutcss.shadrr}>
                        {userInfoNew.email}
                      </span>
                      <a href="#/" onClick={() => adrsChangeShow()}>
                        change
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className={chOutcss.ritemWraper}>
                <Table striped bordered hover>
                  <tbody>
                    {order.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            className={chOutcss.rewItemImg}
                            src={"http://localhost:56482/Images/" + item.Img}
                            alt={item.Img}
                          />
                        </td>
                        <td>
                          <span>{item.brand}</span>
                          <span>{item.model}</span>
                        </td>
                        <td>
                          <span>Rs :{item.price}</span>
                        </td>
                        <td>{item.quentity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col-6">
            {userInfo.length !== 0 && (
              <form id="payment-form" onSubmit={handleSubmit}>
                <div className={["row", chOutcss.bilFoRo].join(" ")}>
                  <div className="col">
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      variant="outlined"
                      defaultValue={userInfo[0].Email}
                      onChange={(e) => emailHanler(e)}
                      required
                    />
                  </div>
                </div>
                <div className={["row", chOutcss.bilFoRo].join(" ")}>
                  <div className="col-6">
                    <TextField
                      fullWidth
                      name="fname"
                      label="First name"
                      variant="outlined"
                      defaultValue={userInfo[0].FirstName}
                      onChange={(e) => fnameHanler(e)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      fullWidth
                      name="lname"
                      label="Last name"
                      variant="outlined"
                      defaultValue={userInfo[0].LastName}
                      onChange={(e) => lnameHanler(e)}
                      required
                    />
                  </div>
                </div>
                <div className={["row", chOutcss.bilFoRo].join(" ")}>
                  <div className="col">
                    <TextField
                      fullWidth
                      name="cardName"
                      label="Card Name"
                      variant="outlined"
                      placeholder="Card name"
                      required
                    />
                  </div>
                </div>
                <div className={["row", chOutcss.bilFoRo].join(" ")}></div>
                <div
                  //style={{ border: "1px solid #eee", padding: "11.4px 12px" }}
                  className={chOutcss.cardEleWrap}
                >
                  <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={handleChange}
                  />
                </div>
                {/* Show any error that happens when processing the payment */}
                {error && (
                  <div className={chOutcss.cardError} role="alert">
                    {error}
                  </div>
                )}
                <div className={chOutcss.btnWraper}>
                  <Button
                    fullWidth
                    type="submit"
                    id="submit"
                    variant="contained"
                    color="secondary"
                    disabled={processing || disabled || succeeded}
                  >
                    <span id={chOutcss.buttonText}>
                      {processing ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        "Confirm and pay"
                      )}
                    </span>
                  </Button>
                  <div className={chOutcss.cardImgWrap}>
                    <img
                      src={CrdImg}
                      className={chOutcss.cardImg}
                      alt="cards"
                    />
                  </div>
                </div>
                {/* Show a success message upon completion */}
              </form>
            )}
          </div>
        </div>
      </div>
      <AdrsChang show={adrsChage} handleClose={adrsChangeClose} />
      <PaySucMg show={paySucMg} handleClose={paySuccMgClose} />
    </Layout>
  );
};
export default CheckoutForm;
