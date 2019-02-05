import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Login from "./LoginComponent";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

class Main extends Component {

  constructor(props){
    super(props);
  }

  render() {
      const LoginPage = () => {
        return (
          <Login />
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