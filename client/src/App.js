import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom'
import AddChild from './components/AddChild'
import Home from './components/Home'
import Children from './components/Children'
import AddActivity from './components/AddActivity'
import Activities from './components/Activities'

import Header from './components/Header';
// import React, { useState, useEffect } from 'react';


function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getActivities();
  }, []);
  function getActivities() {
    fetch('/activities')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        setActivities(data);
      });
  }

  function createActivity() {
    let activity_name = prompt('Enter activity name');
    let description = prompt('Enter activity desctiption');;
    fetch('/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activity_name, description }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getActivities();
      });
  }

  function updateActivity() {
    let id = prompt('Enter activity id');
    let activity_name = prompt('Enter activity name');
    let description = prompt('Enter activity desctiption');;
    fetch(`/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activity_name, description }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getActivities();
      });
  }

  function deleteActivity() {
    let id = prompt('Enter activity id');
    fetch(`/activities/${id}`, {
      method: 'DELETE',

    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getActivities();
      });
  }

  const activity = activities.map((activity) => {
    const name = activity.activity_name
    const key = activity.id
    return <li key={key}>{name}</li>
  })

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addchild" element={<AddChild />} />
        <Route path="/children" element={<Children />} />
        <Route path="/addActivity" element={<AddActivity />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
      {activities ? activity : 'There is no activity data available'}

      <br />
      <button onClick={createActivity}>Add activity</button>
      <br />
      <button onClick={deleteActivity}>Delete activity</button>
      <br />
      <button onClick={updateActivity}>Update activity</button>
    </div>
  );
}
export default App;