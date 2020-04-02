import React,{Component} from 'react';
import { BrowserRouter as Router , Route,Switch,Redirect} from "react-router-dom";
import mainPage from './pages/Index';
import pageNotFound from './pages/404';
import item from './pages/Item';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

class App extends Component {
    render(){
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={mainPage}/>
            <Route exact path="/404"component={pageNotFound}/>
            <Route exact path="/Item/:id"component={item}/>
            <Route exact path="/Login"component={Login}/>
            <Route exact path="/Register"component={Register}/>
            <Route exact path="/Admin"component={Admin}/>
            <Redirect to="/404"/>
          </Switch>
        </Router>
      );
    }
}

export default App;
