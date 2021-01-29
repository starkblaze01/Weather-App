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
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.location.lat}&lon=${this.state.location.lon}&units=metric&exclude=minutely,hourly&appid=fbcfad8f3a5d45c7b97c8fbd25753395`).then(res => {
            this.setState({data: res.data})
            console.log(res.data);
        })
    }

    render() {
        const days = this.state.data ? this.state.data.daily.map(el =>  <Col key={el.dt}>
            <Row>
                <Text strong style={{ margin: 'auto' }}>
                    {this.state.day[new Date(el.dt * 1000).getDay()]}
                </Text>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Text strong>
                        {el.temp.max.toFixed(1)}&deg;
                            </Text>
                </Col>
                <Col span={12}>
                    <Text strong>
                        {el.temp.min.toFixed(1)}&deg;
                    </Text>
                </Col>
            </Row>
            <Row>
                {<img style={{ margin: 'auto', maxHeight: '30px' }} src={this.state.icon[el.weather[0].icon].default} alt={el.weather[0].icon} />}
            </Row>
            <Row>
                <Text type="secondary" style={{ margin: 'auto', padding: '2px' }}>
                    {el.weather[0].main}
                </Text>
            </Row>
        </Col>) : ''

        return (
            <Row style={{height: '20vh', display: 'inline-flex', overflow: 'auto', whiteSpace:'nowrap', flexFlow: 'row'}}>
                {days}

            </Row>
        );
    }
}
/* <div>Icons made by <a href="https://www.flaticon.com/authors/linector" title="Linector">Linector</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */ 

export default Days;