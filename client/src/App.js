import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {NavLink, Routes, Route} from 'react-router-dom'
import AddChild from './components/AddChild'
import Home from './components/Home'
import Children from './components/Children  copy 2'
//import Children2 from './components/Children2'
import AddActivity from './components/AddActivity'
import Activites from './components/Activites'
import ScheduleParent from './components/scheduleParent'
import SchedulesEmployee from './components/schedulesEmployee'
import GoogleMap from './components/GoogleMap';

// import React, { useState, useEffect } from 'react';


function App() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://source.unsplash.com/random/250×250/?daycare/');
        setImageUrl(response.request.responseURL);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImage();
  }, []);

  // const [activities, setActivities] = useState([]);
  // useEffect(() => {
  //   getActivities();
  // }, []);
  // function getActivities() {
  //   fetch('http://localhost:3000/activites')
  //     .then(response => {
  //       console.log('response',response);
  //       return response.json();
  //     })
  //     .then(data => {
  //       setActivities(data);
        
  //     });
  // }

  // function createActivity() {
  //   let activity_name = prompt('Enter activity name');
  //   let description = prompt('Enter activity desctiption');;
  //   fetch('http://localhost:3000/activites', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ activity_name, description }),
  //   })
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       alert(data);
  //       getActivities();
  //     });
  // }

  // function deleteActivity() {
  //   let id = prompt('Enter activity id');
  //   fetch(`http://localhost:3000/activites/${id}`, {
  //     method: 'DELETE',

  //   })
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       alert(data);
  //       getActivities();
  //     });
  // }

  // const activity = activities.map((activity) => {
  //   const name = activity.activity_name
  //   const key = activity.id
  //   return <li>{name}</li>
  // })
  return (
    <div className="App">
      <div className="container">
        <h1>Daycare App</h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Daycare App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/scheduleParent">Kids</NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/children">Children</NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/schedulesEmployee">Activities</NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/activities">Activities</NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/addchild">Add Child</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/addActivity">Add Activity</NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/schedulesEmployee">Activities</NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="center mt-5" style={{ display: "flex", flexDirection: "row" }}>
        <GoogleMap />
        {imageUrl && <img src={imageUrl} className="img-fluid" alt="random-image" />}
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
    </div>
  );
}
export default App;