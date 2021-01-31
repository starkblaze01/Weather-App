import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import SearchBar from './components/SearchBar';
import Chart from './components/Chart';
import Days from './components/Days';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState({ lat: 33.441792, lon: -94.037689});


  useEffect(() => {
    console.log('api call here')
    // axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,daily&appid=fbcfad8f3a5d45c7b97c8fbd25753395`).then(res => {
    //   console.log(res.data);
    // })
  });
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh'}}>
      <SearchBar/>
      <Days />
      <Chart />
    </div>
  );
}
// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
export default App;
