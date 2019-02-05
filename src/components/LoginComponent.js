import React, { Component } from 'react';
import {
  Container, Col, Form, 
  FormGroup, Label, Input,
  Button, Row
} from 'reactstrap';
import '../login.css';

class Login extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="login" sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Sign In</h2>
            <Form className="form">
              <Col>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="myemail@email.com" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="******" />
                </FormGroup>
              </Col>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
