import { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import SearchBar from './components/SearchBar';
import Chart from './components/Chart';
import Days from './components/Days';

function App() {

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh'}}>
      <SearchBar/>
      <Days />
      <Chart />
    </div>
  );
}

export default App;
