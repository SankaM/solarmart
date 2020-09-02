import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import mainPage from "./pages/Index";
import pageNotFound from "./pages/404";
import item from "./pages/Item";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import WishList from "./pages/wishList";
import Cart from "./pages/Cart";
import AdminAuth from "./components/AuthenticatedComponent/adminAuth";
import Aux from "./hoc/Wrap";
import Snackbar from "./components/AlertSnak/Snakbar";
//import LoginAlert from "./components/AlertSnak/LoginAlert";

class App extends Component {
  render() {
    return (
      <Aux>
        <Snackbar />
        <Router>
          <Switch>
            <Route exact path="/" component={mainPage} />
            <Route exact path="/404" component={pageNotFound} />
            <Route exact path="/Item/:id" component={item} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/wishList" component={WishList} />
            <Route exact path="/Cart" component={Cart} />
            <Redirect to="/404" />
            <AdminAuth>
              <Route exact path="/Admin" component={Admin} />
            </AdminAuth>
          </Switch>
        </Router>
      </Aux>
    );
  }
}

export default App;
