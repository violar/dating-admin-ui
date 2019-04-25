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

    let dataResult = [];
    
    for(let value in props.data.result) {
        dataResult.push(props.data.result[value]);
    }
    
    if(dataResult.length > 0 && props.data.group === "dayJoin") {      
        const dayJoinReport = [];

        for(let i=0; i<dataResult.length; i+=1){
            dayJoinReport.push({day: dataResult[i].CreatedDate.slice(0,10), Incomplete: dataResult[i].Incomplete, Complete: dataResult[i].Complete})
        }

        return (
            <AreaChart width={600} height={400} data={dayJoinReport} stackOffset="expand"
            margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                <XAxis dataKey="day"/>
                <YAxis tickFormatter={toPercent}/>
                <Tooltip content={renderTooltipContent}/>
                <Area type='monotone' dataKey='Incomplete' stackId="1" stroke='#8884d8' fill='#8884d8' />
                <Area type='monotone' dataKey='Complete' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            </AreaChart>
        );

    } else if(dataResult.length > 0 && props.data.group === "monthJoin") {
        const monthJoinReport = [];

        for(let i=0; i<dataResult.length; i+=1){
            monthJoinReport.push({month: dataResult[i].CreatedDate, Incomplete: dataResult[i].Incomplete, Complete: dataResult[i].Complete})
        }

        return (
            <AreaChart width={600} height={400} data={monthJoinReport} stackOffset="expand"
            margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                <XAxis dataKey="month"/>
                <YAxis tickFormatter={toPercent}/>
                <Tooltip content={renderTooltipContent}/>
                <Area type='monotone' dataKey='Incomplete' stackId="1" stroke='#8884d8' fill='#8884d8' />
                <Area type='monotone' dataKey='Complete' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            </AreaChart>
        ); 
    } else {
        return (<div></div>)
    }
}

export class Reports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            dropdownOpen: false,
            groupBy: ''
        }

        this.toggleDayMonth = this.toggleDayMonth.bind(this);
        this.datePickerStartDate = this.datePickerStartDate.bind(this);
        this.datePickerEndDate = this.datePickerEndDate.bind(this);
        this.getJoinReport = this.getJoinReport.bind(this);
        this.onGroupChangeDay = this.onGroupChangeDay.bind(this);
        this.onGroupChangeMonth = this.onGroupChangeMonth.bind(this);
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

    getJoinReport() {
        this.props.joinReport(this.state.startDate.toISOString().slice(0,10), this.state.endDate.toISOString().slice(0,10), this.state.groupBy, this.props.token);
    }

    onGroupChangeDay() {
        this.setState({
            groupBy: 'joinDay'
        }, () => this.getJoinReport()); 
    }

    onGroupChangeMonth() {
        this.setState({
            groupBy: 'joinMonth'
        }, () => this.getJoinReport());
    }
    
    render() {
        console.log("inside report component");
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
                                                <ListGroupItem tag="a" href="#">Inappropriate Image Removal</ListGroupItem>
                                                <ListGroupItem tag="a" href="#">Banned Members</ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="d-flex justify-content-center">
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <JoinReport data={this.props.data} group={this.state.groupBy}/>
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
                                                                <DropdownItem onClick={this.onGroupChangeDay}>Day</DropdownItem>
                                                                <DropdownItem onClick={this.onGroupChangeMonth}>Month</DropdownItem>
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