import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { authenticateUser, logoutUser, createUser, joinReport } from '../redux/ActionCreators';
import { Login } from "./LoginComponent";
import { connect } from "react-redux";
import { Loading } from './LoadingComponent';
import { Navigation } from './NavComponent';
import { Home } from './HomeComponent';
import { Reports } from './ReportsComponent';
import { Signup } from './SignupComponent';


const mapStateToProps = state => {
  const userToken = JSON.parse(localStorage.getItem('token'));
    
  return {
    login: state.login,
    signup: state.signup,
    loading: state.loading,
    joinReport: state.joinReport,
    token: userToken
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: (credentials) => { dispatch(authenticateUser(credentials)) },
  createUser: (userInformation) => { dispatch(createUser(userInformation)) },
  getJoinReport: (startDate, endDate, groupBy, token) => { dispatch(joinReport(startDate, endDate, groupBy, token)) }
});

class Main extends Component {

  constructor(props){
    super(props);
  }

  render = () => {
      const LoginPage = () => {
        return (
          <Login 
            loginFailed={this.props.login.loginFailed}
            authenticate={this.props.authenticateUser} />
        );
      }  

      const HomePage = () => {
        return (
          <Home />
        );
      }

      const ReportsPage = () => {
        return (
          <Reports joinReport={this.props.getJoinReport} token={this.props.token}
            data={this.props.joinReport.report} />
        );
      }

      const SignupPage = () => {
        return (
          <Signup createUser={this.props.createUser} 
            userCreated={this.props.signup.userCreated._id}
            userToken={this.props.token} />
        );
      }

      return (
        <div>
          <Navigation token={this.props.token} />
          <Loading isActive={this.props.loading.loader} />
          <Switch>
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/reports" component={ReportsPage} />
            <Redirect to="/login" />
          </Switch>
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));