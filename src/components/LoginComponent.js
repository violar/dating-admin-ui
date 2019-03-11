import React, { Component } from 'react';
import {
  Container, Col, 
  FormGroup, Label,
  Button, Row
} from 'reactstrap';
import '../login.css';
import { Control, Form, Errors } from 'react-redux-form';
import { Redirect } from 'react-router';

const required = (val) => val && val.length;

class Login extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.authenticate(values);
  }

  render() {
    console.log(this.props.loginSuccessfull.length);
    console.log(this.props.loginSuccessfull);

    if(this.props.loginSuccessfull.length !== 0) {
      return <Redirect to="/home" />
    }

    return (
      <Container>
        <Row>
          <Col className="login" sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Sign In</h2>
            <Form model="userLoginForm" className="form" onSubmit={(values => this.handleSubmit(values))}>
              <Col>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Control.text model=".email" id="email" name="email" placeholder="Enter email" 
                      className="form-control"
                      validators={{
                        required
                      }} />
                  <Errors model=".email" show="touched" 
                      className="text-danger"
                      messages={{
                        required: 'Please enter your email address'
                      }} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Control.text model=".password" id="password" name="password" placeholder="**********"
                      className="form-control"
                      validators={{
                        required
                      }} />
                  <Errors model=".password" show="touched"
                      className="text-danger"
                      messages={{
                        required: 'Please enter your password'
                      }} />
                </FormGroup>
              </Col>
              <Button type="submit" color="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
