import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import SearchBar from './components/SearchBar';
import Chart from './components/Chart';
import Days from './components/Days';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState({ lat: 33.441792, lon: -94.037689});
  const [data, setData] = useState('');

  useEffect(() => {
    console.log('api call here')
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely&appid=fbcfad8f3a5d45c7b97c8fbd25753395`).then(res => {
      setData(res.data)
      console.log(res.data);
    })
  },[location]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh'}}>
      <SearchBar/>
      <Days data = {data}/>
      <Chart data={data}/>
    </div>
  );
}
// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
export default App;
