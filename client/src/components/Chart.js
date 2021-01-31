import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';
import { Typography, Row, Col } from 'antd';
import { clearSkyDay, clearSkyNight, fewCloudsDay, fewCloudsNight, scatteredClouds, brokenClouds, thunderStorm, showerRain, rain, snow, mist } from '../images';

const {Title} = Typography;

class Chart extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chartData: '',
            icon: {
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
            }
        }
    }

    render() {
        const data = {
            labels: ['1', '2', '3', '4', '5', '6'],            
            datasets: [
                {
                    data: [12, 19, 3, 5, 2, 3],
                    fill: false,
                    backgroundColor: 'rgb(39, 221, 245)',
                    borderColor: 'rgba(39, 221, 245, 0.5)',
                    pointRadius: 4,
                    pointBackgroundColor: 'rgb(255,255,255)',
                    pointBorderWidth: 2,
                    pointBorderColor: 'rgb(39, 221, 245)'
                },
            ],
        }
        const options = { 
                legend: {
                    display: false
                },
                
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
                                        

        return (
            <Card style={{ height: '60vh', boxShadow: '5px 5px 50px -8px grey', borderRadius: '8px'}}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}} style={{width: '100%'}}>
                    <Col span={15}>
                        {this.props.data ? <Title>{this.props.data.current.temp.toFixed(1)}&deg;C</Title> : ''} 
                    </Col>
                    <Col span={8}>
                        {this.props.data ? <img src={this.state.icon[this.props.data.current.weather[0].icon].default} alt={this.props.data.current.weather[0].icon} style={{maxHeight: '50px'}}/> : ''}
                    </Col>
                    <Col >
                    </Col>
                </Row>
                <Line data={data} options={options}/>
            </Card>
        );
    }

}

export default Chart;