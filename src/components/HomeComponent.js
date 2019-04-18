import React from 'react';
import report from '../images/report-writing.jpg';
import security from '../images/security.jpg';
import { Container, Row, Col, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';


export const Home = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Alert color="warning">
                        <h4 className="alert-heading">Welcome admin!</h4>
                        <p>Aww yeah, you successfully read this important alert message. 
                            This example text is going to run a bit longer so that you can 
                            see how spacing within an alert works with this kind of content.</p>
                        <hr />
                        <p>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="home-image-thumb">
                        <img src={report} width="100%" height="100%" className="img-thumbnail" />
                        <div className="home-image-overlay">
                            <div className="home-image-overlay-inner">
                                <Link to="./reports">REPORTS</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="home-image-thumb">
                        <img src={security} width="100%" height="100%" className="img-thumbnail" />
                        <div className="home-image-overlay">
                            <div className="home-image-overlay-inner">SECURITY</div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="home-image-thumb">
                        <img src={security} width="100%" height="100%" className="img-thumbnail" />
                        <div className="home-image-overlay">
                            <div className="home-image-overlay-inner">OTHER</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}