import React,  { Component } from 'react';
import { Row, Col, Typography} from 'antd';
import axios from 'axios';
import { clearSkyDay, clearSkyNight, fewCloudsDay, fewCloudsNight, scatteredClouds, brokenClouds, thunderStorm, showerRain, rain, snow, mist} from '../images';
const { Text } = Typography;

class Days extends Component {
    constructor(props){
        super(props);
        this.state ={
            location:{
                lat: 33.441792, lon: -94.037689 
            },
            icon:{
                '01d': clearSkyDay,
                '01n': clearSkyNight,
                '02d': fewCloudsDay,
                '02n': fewCloudsNight,
                '03d': scatteredClouds,
                '03n': scatteredClouds,
                '04d': brokenClouds,
                '04n': brokenClouds,
                '11d': thunderStorm,
                '11n': thunderStorm,
                '09d': showerRain,
                '09n': showerRain,
                '10d': rain,
                '10n': rain,
                '13d': snow,
                '13n': snow,
                '50d': mist,
                '50n': mist
            },
            data: '',
            day: {
                0: 'Sun',
                1: 'Mon',
                2: 'Tue',
                3: 'Wed',
                4: 'Thur',
                5: 'Fri',
                6: 'Sat'
            }
        }
    }
    async componentDidMount(){
        console.log('api call here_days')
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&appid=fbcfad8f3a5d45c7b97c8fbd25753395`).then(res => {
            this.setState({data: res.data})
            console.log(res.data);
        })
    }

    render() {
        return (
            <Row style={{height: '20vh', display: 'inline-flex', overflow: 'auto', whiteSpace:'nowrap'}}>
                <Col>
                    <Row><Text strong>{this.state.data ? this.state.day[new Date(this.state.data.dt * 1000).getDay()] : ''}</Text></Row>
                    <Row>{this.state.data ? '' : ''}</Row>
                    <Row>{this.state.data ? '' : '' }</Row>
                    <Row>{ this.state.data ? <img src={this.state.icon[this.state.data.weather[0].icon].default} alt="some"/> : ''}</Row>
                </Col>
                <Col>
                    <Row>Mon</Row>
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