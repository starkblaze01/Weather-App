import React, {Component} from 'react';
import { Input, AutoComplete } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { SearchOutlined} from '@ant-design/icons';
import debounce from 'lodash.debounce';
import axios from 'axios';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: [{value: 'Mumbai'}, {value: 'Varanasi'}, {value: 'Pune'}],
        }
    }


    onSearch = (searchText) => {
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&locationbias=ipbias&key=${process.env.REACT_GOOGLE_MAPS_PLACE_API_KEY}`).then(res => {
            if(res.data){
            this.setState({
                options: res.data.predictions.length ? res.data.predictions.map(el => { return { value: el.description } }) : [{ value: 'Mumbai' }, { value: 'Varanasi' }, { value: 'Pune' }]
            })}
        })
    }

    onOptionSelect = (value) => {
        axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,geometry&input=${value}&inputtype=textquery&locationbias=ipbias&language=en&key=${process.env.REACT_GOOGLE_MAPS_PLACE_API_KEY}`).then(res => {
            this.props.getCoordinatesWeather({ lat: res.data.candidates[0].geometry.location.lat, lon: res.data.candidates[0].geometry.location.lng });
        }).catch(err => {
            console.log(err);
        })
    }


    render(){
        return (
            <div style={{height: '10vh'}}>
                <AutoComplete options={this.state.options} style={{ width: '100%', boxShadow: '5px 5px 50px -8px grey', borderRadius: '8px' }} onSearch={debounce((val) => this.onSearch(val), 1000)} onSelect={(val) => this.onOptionSelect(val)}>
                    <Input prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />} size="large" suffix={<SearchOutlined />} style={{ borderRadius: '8px'}}/>
                </AutoComplete>
            </div>
        );
    }

}

export default SearchBar;