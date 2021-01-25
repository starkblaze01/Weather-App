import React, { Component } from 'react';
// import { Line } from '@';
import { Card } from 'antd';

class Chart extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chartData: ''
        }
    }

    render() {
        return (
            <Card style={{ height: '60vh', boxShadow: '5px 5px 50px -8px grey', borderRadius: '8px'}}>
                hey there!
            </Card>
        );
    }

}

export default Chart;