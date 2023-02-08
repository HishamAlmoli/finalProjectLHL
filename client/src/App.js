import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddChild from './components/AddChild'
import Home from './components/Home'
import Children from './components/Children'
import AddActivity from './components/AddActivity'
import Activites from './components/Activites'

function App() {

  const [newChild, setNewChild] = useState([]);

useEffect (() => {
  axios.get('/newChild').then(res => {
    console.log(res.data.childrenDatabase);
    setNewChild(res.data.childrenDatabase);
  })
}, [])

  return (
      <div className="App">
        {/* {Object.keys(newChild).map(child => <li>{child} {newChild}</li>)} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addchild" element={<AddChild />} />
          <Route path="/children" element={<Children />} />
          <Route path="/addActivity" element={<AddActivity />} />
          <Route path="/activites" element={<Activites />} />
        </Routes>
      </div>
  );
}

export default App;
