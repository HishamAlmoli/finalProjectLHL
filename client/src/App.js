import React, { useState, useEffect } from 'react';


function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getActivities();
  }, []);
  function getActivities() {
    fetch('http://localhost:8001')
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
    fetch('http://localhost:8001/activities', {
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
    fetch(`http://localhost:8001/activities/${id}`, {
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
    <div>
      {activities ? activity : 'There is no activity data available'}
      <br />
      <button onClick={createActivity}>Add activity</button>
      <br />
      <button onClick={deleteActivity}>Delete activity</button>
    </div>
  );
}
export default App;