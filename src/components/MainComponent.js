import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {authenticateUser} from '../redux/ActionCreators';
import Login from "./LoginComponent";
import Home from "./HomeComponent";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: (credentials) => { dispatch(authenticateUser(credentials)) }
});

class Main extends Component {

  constructor(props){
    super(props);
  }

  render() {
      const LoginPage = () => {
        return (
          <Login 
            processingAuthentication={this.props.login.processingAuthentication} 
            loginFailed={this.props.login.loginFailed}
            authenticate={this.props.authenticateUser} />
        );
      }  

      const HomePage = () => {
        return (
          <Home loggedUser={this.props.login.loggedUser} />
        );
      }

      return (
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Redirect to="/login" />
        </Switch>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));