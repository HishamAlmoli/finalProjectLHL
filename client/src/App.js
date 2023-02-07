import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

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
      <h1>Add New Child Page</h1>
      {Object.keys(newChild).map(child => <li>{child} {newChild}</li>)}
    </div>
  );
}

export default App;
