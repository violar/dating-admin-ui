import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import { Form, Control, Errors } from 'react-redux-form';
import { Redirect } from 'react-router-dom';
import '../login.css';

const required = val => val && val.length;

export const Signup = (props) => {
    if(props.userCreated) {
      return <Redirect to="/login" />
    }

    return (
        <Container>
                <Row>
                    <Col className="login" sm="12" md={{ size: 6, offset: 3 }}>
                        <h4>Sign Up</h4>
                        <Form model="signupUser" className="form" onSubmit={(values => props.createUser(values))}>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.text model=".name" name="name" id="name" placeholder="Enter name"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors model=".name" show="touched" className="text-danger"
                                        messages={{
                                            required: 'Please add your name'
                                        }} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Control.text model=".email" name="email" id="email" placeholder="Enter email"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors model=".email" show="touched" className="text-danger"
                                        messages={{
                                            required: 'Please add email'
                                        }} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Control.text model=".password" name="password" id="password" placeholder="Enter password"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors model=".password" show="touched" className="text-danger"
                                        messages={{
                                            required: 'Please add password'
                                        }} />
                                </FormGroup>
                            </Col>
                            <Button type="submit" color="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
    )
}