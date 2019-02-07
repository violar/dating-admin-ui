import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {authenticateUser} from '../redux/ActionCreators';
import Login from "./LoginComponent";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    loginSuccessfull: state.loginSuccessfull,
    processingAuthentication: state.processingAuthentication,
    loginFailed: state.loginFailed
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
            processingAuthentication={this.props.processingAuthentication} 
            loginFailed={this.props.loginFailed}
            loginSuccessfull={this.props.loginSuccessfull}
            authenticate={this.props.authenticateUser} />
        );
      }  

      return (
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));