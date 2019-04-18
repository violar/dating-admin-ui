import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Input } from 'reactstrap';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;
  
    return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => (result + entry.value), 0);
  
    return (
        <div className="customized-tooltip-content">
            <p className="total">{`${label} (Total: ${total})`}</p>
            <ul className="list">
                {
                    payload.map((entry, index) => (
                    <li key={`item-${index}`} style={{color: entry.color}}>
                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                    </li>
                ))
                }
            </ul>
        </div>
    );
};

const JoinReport = (props) => {
    props.joinReport(props.startDate, props.endDate, props.groupBy, props.token);

    /*
    const monthJoinReport = [
        {monthJoinReport: 'Jan', Incomplete: 4000, Complete: 2400}
    ];*/
    
    const dayJoinReport = [
        props.data.forEach(d => (
            {dayJoinReport: d[0].getDate(), Incomplete: d[2], Complete: d[3]}
        ))
    ];

    return (
        <AreaChart width={600} height={400} data={props.groupBy} stackOffset="expand"
        margin={{top: 10, right: 30, left: 0, bottom: 0}} >
            <XAxis dataKey={prop.groupBy}/>
            <YAxis tickFormatter={toPercent}/>
            <Tooltip content={renderTooltipContent}/>
            <Area type='monotone' dataKey='Incomplete' stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='Complete' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
        </AreaChart>
    );
}

export class Reports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            dropdownOpen: false,
            groupBy: "dayJoinReport"
        }

        this.toggleDayMonth = this.toggleDayMonth.bind(this);
        this.datePickerStartDate = this.datePickerStartDate.bind(this);
        this.datePickerEndDate = this.datePickerEndDate.bind(this);
    }

    toggleDayMonth() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    datePickerStartDate(date) {
        this.setState({
            startDate: date,
        });
    }

    datePickerEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle><h4>Select a report to view: </h4></CardTitle>
                                <Row>
                                    <Col xs="3">
                                        <Row>
                                            <Col>
                                                <ListGroup flush>
                                                <ListGroupItem disabled tag="a" href="#">Join Completion</ListGroupItem>
                                                <ListGroupItem tag="a" href="#">Dapibus ac facilisis in</ListGroupItem>
                                                <ListGroupItem tag="a" href="#">Morbi leo risus</ListGroupItem>
                                                <ListGroupItem tag="a" href="#">Porta ac consectetur ac</ListGroupItem>
                                                <ListGroupItem tag="a" href="#">Vestibulum at eros</ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="d-flex justify-content-center">
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <JoinReport joinReport={this.props.joinReport} 
                                                            token={this.props.token} 
                                                            startDate={this.state.startDate} 
                                                            endDate={this.state.endDate} 
                                                            groupBy={this.state.groupBy} 
                                                            data={this.props.data}/>
                                                    </Col>
                                                </Row>
                                                <Row className="d-flex align-items-end">
                                              
                                                    <Col xs='4'> 
                                                        From : &nbsp;
                                                        <DatePicker
                                                            selected={this.state.startDate}
                                                            onChange={this.datePickerStartDate}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            dateFormat="MMMM d, yyyy"
                                                        />
                                                    </Col>
                                                    <Col xs='4'>
                                                        To : &nbsp; 
                                                        <DatePicker
                                                            selected={this.state.endDate}
                                                            onChange={this.datePickerEndDate}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            dateFormat="MMMM d, yyyy"
                                                        />
                                                    </Col>
                                                    <Col xs='4'>
                                                        <Dropdown isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggleDayMonth}>
                                                            <DropdownToggle caret>Search By</DropdownToggle>
                                                            <DropdownMenu>
                                                                <DropdownItem onClick={() => this.setState({groupBy: 'dayJoinReport'})}>Day</DropdownItem>
                                                                <DropdownItem onClick={() => this.setState({groupBy: 'monthJoinReport'})}>Month</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}