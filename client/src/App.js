import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import SearchBar from './components/SearchBar';
import Chart from './components/Chart';
import Days from './components/Days';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&exclude=minutely&appid=${process.env.REACT_OPEN_WEATHER_APP_API_KEY}`).then(res => {
          setData(res.data)
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
      },
      (error) => {
        console.log(error);
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${33.441792}&lon=${-94.037689}&units=metric&exclude=minutely&appid=${process.env.REACT_OPEN_WEATHER_APP_API_KEY}`).then(res => {
          setData(res.data)
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  },[]);

  const getCoordinatesWeather = (coord) => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely&appid=${process.env.REACT_OPEN_WEATHER_APP_API_KEY}`).then(res => {
      setData(res.data)
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '105vh'}}>
      <SearchBar getCoordinatesWeather={getCoordinatesWeather}/>
      <Days data={data}/>
      <Chart data={data}/>
    </div>
  );
}

export default App;
