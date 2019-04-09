import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { authenticateUser, logoutUser, createUser } from '../redux/ActionCreators';
import Login from "./LoginComponent";
import { connect } from "react-redux";
import { Loading } from './LoadingComponent';
import { Navigation } from './NavComponent';
import { User } from './HomeComponent';
import Signup from './SignupComponent';


const mapStateToProps = state => {
  console.log("inside main mapStateToProps");
  console.log({login: state.login.loginFailed});
  return {
    login: state.login,
    signup: state.signup,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: (credentials) => { dispatch(authenticateUser(credentials)) },
  createUser: (userInformation) => { dispatch(createUser(userInformation)) }
});

class Main extends Component {

  constructor(props){
    super(props);
  }

  render() {
    console.log("inside main render");
    console.log(this.props.login.user);
      const LoginPage = () => {
        return (
          <Login 
            loginFailed={this.props.login.loginFailed}
            authenticate={this.props.authenticateUser} />
        );
      }  

      const UserPage = () => {
        return (
          <User />
        );
      }

      const SignupPage = () => {
        console.log("inside signup page")
        console.log(this.props.signup.userCreated._id + "this is my new usercreated");
        return (
          <Signup createUser={this.props.createUser} 
            userCreated={this.props.signup.userCreated._id} />
        );
      }

      return (
        <div>
          <Navigation token={this.props.login.user} />
          <Loading isActive={this.props.loading.loader} />
          <Switch>
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={UserPage} />
            <Redirect to="/login" />
          </Switch>
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));