import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {NavLink, Routes, Route} from 'react-router-dom'
import AddChild from './components/AddChild'
import Home from './components/Home'
import Children from './components/Children'
import AddActivity from './components/AddActivity'
import Activites from './components/Activites'
import ScheduleParent from './components/scheduleParent'
import SchedulesEmployee from './components/schedulesEmployee'
// import React, { useState, useEffect } from 'react';


function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getActivities();
  }, []);
  function getActivities() {
    fetch('http://localhost:3000/activites')
      .then(response => {
        console.log('response',response);
        return response.json();
      })
      .then(data => {
        setActivities(data);
        
      });
  }

  function createActivity() {
    let activity_name = prompt('Enter activity name');
    let description = prompt('Enter activity desctiption');;
    fetch('http://localhost:3000/activites', {
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

  function deleteActivity() {
    let id = prompt('Enter activity id');
    fetch(`http://localhost:3000/activites/${id}`, {
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
    return <li>{name}</li>
  })
  return (
    <div className="App">
      <div>
        <h1>Daycare App</h1>
        <nav>
          <NavLink to="/">Home </NavLink>
          <NavLink to="/children">Children </NavLink>
          <NavLink to="/activites">Activites </NavLink>
          <NavLink to="/addchild">AddChild </NavLink>
          <NavLink to="/addActivity">AddActivity </NavLink>
          <br />
          <NavLink to="/schedulesEmployee">SchedulesEmployee </NavLink>
          <NavLink to="/scheduleParent">ScheduleParent </NavLink>
        </nav>
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addchild" element={<AddChild />} />
          <Route path="/children" element={<Children />} />
          <Route path="/addActivity" element={<AddActivity />} />
          <Route path="/activites" element={<Activites />} />
          <Route path="/schedulesEmployee" element={<SchedulesEmployee />} />
          <Route path="/scheduleParent" element={<ScheduleParent />} />
        </Routes>
      {activities ? activity : 'There is no activity data available'}
      <br />
      <button onClick={createActivity}>Add activity</button>
      <br />
      <button onClick={deleteActivity}>Delete activity</button>
    </div>
  );
}
export default App;