import React, {Component} from 'react';
import { Input, AutoComplete } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { SearchOutlined} from '@ant-design/icons';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }

    render(){
        return (
            <div style={{height: '10vh'}}>
                <AutoComplete style={{ width: '100%', boxShadow: '5px 5px 50px -8px grey', borderRadius: '8px'}}>
                    <Input prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />} size="large" suffix={<SearchOutlined />} style={{ borderRadius: '8px'}}/>
                </AutoComplete>
            </div>

        );
    }

}

export default SearchBar;