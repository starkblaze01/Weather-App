import React,  { Component } from 'react';
import { Row, Col} from 'antd';

class Days extends Component {
    render() {
        
        return (
            <Row style={{height: '20vh', display: 'inline-flex', justifyContent: 'space-between', overflow: 'auto'}}>
                <Col>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                    <Row>Sun dckndskcndddddddd</Row>
                    <Row>Sun</Row>
                </Col>
                <Col>
                    <Row>Mon cdcdcdd</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                </Col>
                <Col>
                    <Row>Tue</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                </Col>
                <Col>
                    <Row>Wed</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                </Col>
                <Col>
                    <Row>Thurs</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                </Col>
                <Col>
                    <Row>Fri</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                </Col>
                <Col>
                    <Row>Sat</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                    <Row>Sun</Row>
                </Col>
            </Row>
        );
    }
}
/* <div>Icons made by <a href="https://www.flaticon.com/authors/linector" title="Linector">Linector</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */ 

export default Days;