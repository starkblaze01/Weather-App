import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';
import { Typography, Row, Col } from 'antd';
import { clearSkyDay, clearSkyNight, fewCloudsDay, fewCloudsNight, scatteredClouds, brokenClouds, thunderStorm, showerRain, rain, snow, mist } from '../images';

const {Title, Text} = Typography;

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
        const datasetKeyProvider = () => {
            return btoa(Math.random()).substring(0, 12)
        } 
        const data = {
            datasets: [
                {
                    data: this.props.data.hourly ? this.props.data.hourly.map(el => el.temp) : [12, 19, 3, 5, 2, 3],
                    fill: false,
                    backgroundColor: 'rgb(39, 221, 245)',
                    borderColor: 'rgba(39, 221, 245, 0.5)',
                    pointRadius: 4,
                    pointBackgroundColor: 'rgb(255,255,255)',
                    pointBorderWidth: 2,
                    pointBorderColor: 'rgb(39, 221, 245)',
                    spanGaps: true
                },
            ],
        }
        const options = { 
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false,
                            zeroLineColor: 'rgba(0,0,0,0)',
                            drawBorder: false,
                        },
                        ticks: {
                            display: false,
                            tickMarkLength: 5,
                        }
                    }],
                    xAxes: [{
                        labels: this.props.data ? this.props.data.hourly.map(el => {
                            let hours = ''
                            if (new Date(el.dt * 1000).getHours() === 12) {
                                hours = '12pm'
                            } else if (new Date(el.dt * 1000).getHours() === 0) {
                                hours = '12am'
                            } else if (new Date(el.dt * 1000).getHours() > 12) {
                                hours = (new Date(el.dt * 1000).getHours() - 12).toString() + 'pm'
                            } else {
                                hours = new Date(el.dt * 1000).getHours().toString() + 'am'
                            }
                            return [el.temp.toFixed(1).toString() + '\u00B0' , hours]
                        }) :  ['1', '2', '3', '4', '5', '6'],
                        ticks: {
                            fontStyle: 'bold',
                            maxTicksLimit: 48,
                            tickMarkLength: 400,
                            circular: true
                        },

                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: 'rgba(0,0,0,0.1)',
                        }
                    }]
                }
            }
        let currentTime = [0, 0, 1, 2, 1, 0, 0];
        let radius = [0, 0, 0, 0 ,0 , 0, 0];
        let hover = [0, 0, 0, 0, 0, 0, 0];
        if(this.props.data){
            let sunrise, current, sunset;
            sunrise = Number(new Date(this.props.data.current.sunrise * 1000).toLocaleTimeString('en-GB', { timeZone: this.props.data.timezone }).split(':')[0])
            sunset = Number(new Date(this.props.data.current.sunset * 1000).toLocaleTimeString('en-GB', { timeZone: this.props.data.timezone }).split(':')[0])
            current = Number(new Date(this.props.data.current.dt * 1000).toLocaleTimeString('en-GB', { timeZone: this.props.data.timezone }).split(':')[0])
            if (current <sunrise){
                currentTime = [0, 0];
                radius = [0, 0];
                hover = [0, 0];
            } else if (current === sunrise){
                currentTime = [0, 0];
                radius= [0, 10];
                hover = [0, 20];
            } else if (current > sunrise && current <= (5*sunrise+3*sunset)/8){
                currentTime = [0, 0, 1];
                radius = [0, 0, 10];
                hover =  [0, 0, 20];
            } else if (current > (5 * sunrise + 3 * sunset) / 8 && current <= (5*sunset + 3*sunrise)/8){
                currentTime = [0, 0, 1, 2];
                radius = [0, 0, 0, 10];
                hover = [0, 0, 0, 20];
            } else if (current > (5 * sunset + 3 * sunrise) / 8 && current <= (sunrise + 7*sunset)/8){
                currentTime = [0, 0, 1, 2, 1];
                radius = [0, 0, 0, 0, 10];
                hover = [0, 0, 0, 0, 20];
            }
        }
        const data1 = {
            labels: ['', this.props.data ? new Date(this.props.data.current.sunrise * 1000).toLocaleTimeString('en-US', { timeZone: this.props.data.timezone }) : '', '', '', '', this.props.data ? new Date(this.props.data.current.sunset * 1000).toLocaleTimeString('en-US', { timeZone: this.props.data.timezone }) : '', ''],

            datasets: [
                {
                    data: [-2, 0, 0, 0, 0, 0, -2],
                    fill: true,
                    backgroundColor: '#838383',
                    borderColor: '#838383',
                    pointRadius: [0,0,0,0,0,0,0],
                    pointHoverRadius: [0,0,0,0,0,0,0],
                    pointHoverBackgroundColor: '#838383',
                    pointBorderWidth: 2,
                    spanGaps: false,
                },
                {
                    data: [0, 0, 1, 2, 1, 0, 0],
                    fill: false,
                    backgroundColor: 'rgba(255, 255, 0, 0.5)',
                    borderColor: 'rgb(255, 255, 0)',
                    pointRadius: [0, 0, 0, 0, 0, 0, 0],
                    pointHoverRadius: [0, 0, 0, 0, 0, 0, 0],
                    pointHoverBackgroundColor: 'rgb(255, 255, 0)',
                    pointBorderWidth: 2,
                    spanGaps: false,
                },
                {
                    data: currentTime,
                    fill: true,
                    backgroundColor: 'rgba(255, 255, 0, 0.5)',
                    borderWidth: '0px',
                    borderColor: 'rgb(255, 255, 0)',
                    pointRadius: radius,
                    pointHoverRadius: hover,
                    pointHoverBackgroundColor: 'rgb(255, 255, 0)',
                    pointStyle: 'star',
                    pointBorderWidth: 2,
                    spanGaps: false,
                }
            ],
        }   
        const options1 = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            layout: {
                padding: {
                    top: 10,
                }
            },
            scales: {
                yAxes: [{
                    yAxisID: 'y',
                    gridLines: {
                        display: false,
                        zeroLineColor: 'rgba(0,0,0,0)',
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                        tickMarkLength: 5,
                    }
                }],
                xAxes: [{
                    // labels: ['', this.props.data ? new Date(this.props.data.current.sunrise * 1000).toLocaleTimeString('en-US', { timeZone: this.props.data.timezone }) : '', '', '', '', this.props.data ? new Date(this.props.data.current.sunset * 1000).toLocaleTimeString('en-US', { timeZone: this.props.data.timezone }) : '', ''],
                    ticks: {
                        fontStyle: 'bold',
                        // maxTicksLimit: 48,
                        // tickMarkLength: 400,
                        circular: true
                    },

                    gridLines: {
                        drawBorder: false,
                        zeroLineColor: 'rgba(0,0,0,0.1)',
                    }
                }]
            }
        } 


        return (
            <Card style={{ height: '80vh', boxShadow: '5px 5px 50px -8px grey', borderRadius: '8px'}}>
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
                <div style={{ overflow: 'scroll' }}>
                    <div style={{ width: '2000px'}}>
                        <Line data={data} options={options}/>
                    </div>
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={10} style={{ background: 'rgba(39, 221, 245, 0.15)'}}>
                        <Row style={{marginLeft: '5px', marginTop: '5px' }}>
                            <Text strong>Pressure</Text>
                        </Row>
                        <Row style={{ marginLeft: '5px', marginBottom: '5px' }}>
                            <Text strong>{this.props.data ? this.props.data.current.pressure : ''} hpa </Text>
                        </Row>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={10} style={{ background: 'rgba(39, 221, 245, 0.15)'}}>
                        <Row style={{ marginLeft: '5px', marginTop: '5px'}}>
                            <Text strong>Humidity</Text>
                        </Row>
                        <Row style={{ marginLeft: '5px', marginBottom: '5px' }}>
                            <Text strong>{this.props.data ? this.props.data.current.humidity : ''} %</Text>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={10}>
                        <Row style={{ marginLeft: '5px', marginTop: '5px' }}>
                            <Text strong>Sunrise</Text>
                        </Row>
                        <Row style={{ marginLeft: '5px', marginBottom: '5px' }}>
                            <Text strong type="secondary">{this.props.data ? new Date(this.props.data.current.sunrise*1000).toLocaleTimeString('en-US', { timeZone: this.props.data.timezone }) : ''}</Text>
                        </Row>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={10}>
                        <Row style={{ marginTop: '5px', justifyContent: 'flex-end'}}>
                            <Text strong>Sunset</Text>
                        </Row>
                        <Row style={{ marginBottom: '5px', justifyContent: 'flex-end'}}>
                            <Text strong type="secondary">{this.props.data ? new Date(this.props.data.current.sunset*1000).toLocaleTimeString('en-US', { timeZone: this.props.data.timezone }) : ''}</Text>
                        </Row>
                    </Col>
                </Row>
                <div>
                    <Line data={data1} options={options1} datasetKeyProvider={datasetKeyProvider}/>
                </div>
            </Card>
        );
    }

}

export default Chart;