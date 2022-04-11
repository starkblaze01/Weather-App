import React, {Component} from 'react';
import { Input, AutoComplete } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { SearchOutlined} from '@ant-design/icons';
import debounce from 'lodash.debounce';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: [{value: 'Mumbai'}, {value: 'Varanasi'}, {value: 'Pune'}],
        }
    }


    onSearch = (searchText) => {
        if(searchText === ''){
            return;
        }
        var service;
        service = new window.google.maps.places.AutocompleteService(document.getElementById('map'));
        service.getQueryPredictions({ input: searchText }, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    options: predictions.map(prediction => ({
                        value: prediction.description,
                        label: prediction.description,
                        })
                    )
                });
            } else {
                console.log(status);
            }
        });
    }

    onOptionSelect = (value) => {
        var service;
        service = new window.google.maps.places.PlacesService(document.getElementById('map'));
        service.findPlaceFromQuery({
            query: value,
            fields: ['formatted_address', 'geometry']
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.props.getCoordinatesWeather({lat: results[0].geometry.location.lat(), lon: results[0].geometry.location.lng()});
            }
            else {
                console.log(status);
            }
        });
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