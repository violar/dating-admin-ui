import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { authenticateUser, logoutUser, createUser } from '../redux/ActionCreators';
import Login from "./LoginComponent";
import Home from "./HomeComponent";
import { connect } from "react-redux";
import { Loading } from './LoadingComponent';
import Signup from './SignupComponent';


const mapStateToProps = state => {
  console.log("inside main mapStateToProps");
  return {
    login: state.login,
    signup: state.signup,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: (credentials) => { dispatch(authenticateUser(credentials)) },
  logoutUser: () => { dispatch(logoutUser()) },
  createUser: (userInformation) => { dispatch(createUser(userInformation)) }
});

class Main extends Component {

  constructor(props){
    super(props);
  }

  render() {
    console.log("inside main render");
      const LoginPage = () => {
        console.log("inside main login");
        return (
          <Login 
            loginFailed={this.props.login.loginFailed}
            authenticate={this.props.authenticateUser}
            loginSuccessfull={this.props.login.loggedUser} />
        );
      }  

      const HomePage = () => {
        console.log("inside main homepage");
        console.log(this.props.login.loggedUser);
        return (
          <Home loggedUser={this.props.login.loggedUser} logoutUser={this.props.logoutUser} />
        );
      }

      const SignupPage = () => {
        console.log("inside signup page")
        console.log(this.props.signup.userCreated._id);
        return (
          <Signup createUser={this.props.createUser} 
            userCreated={this.props.signup.userCreated._id} />
        );
      }

      return (
        <div>
          NAVBAR
          <Loading isActive={this.props.loading.loader} />
          <Switch>
            <Route path="/signup" component={SignupPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            
            <Redirect to="/signup" />
          </Switch>
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));