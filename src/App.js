import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import collection from "./pages/Index";
import pageNotFound from "./pages/404";
import item from "./pages/Item";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import WishList from "./pages/wishList";
import Cart from "./pages/Cart";
import AdminAuth from "./components/AuthenticatedComponent/adminAuth";
import Aux from "./hoc/Wrap";
import Snackbar from "./components/AlertSnak/Snakbar";
import Checkout from "./pages/checkout";
import Order from './pages/MyOrders';

import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";


const stripePromise = loadStripe("pk_test_51HNcAOHeIC10TyBvOyC7FUgAQvSGvDPWnXAmq2tKCSQM51K1zUZWFHP5Evyc5JLwuoLtxLgyLcsjI8WK1BPjXYpQ00q5GFHHIK");
class App extends Component { 
  render() {
    return (
      <Aux>
        <Snackbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/collection" component={collection} />
            <Route exact path="/404" component={pageNotFound} />
            <Route exact path="/Item/:id" component={item} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/wishList" component={WishList} />
            <Route exact path="/Cart" component={Cart} />
            <Route exact path="/MyOrders" component={Order} />
            <Route exact path="/checkout">
              <Elements stripe={stripePromise}>
                  <Checkout/>
              </Elements>
            </Route>
            <AdminAuth>
              <Route exact path="/Admin" component={Admin} />
            </AdminAuth>
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Aux>
    );
  }
}

export default App;
