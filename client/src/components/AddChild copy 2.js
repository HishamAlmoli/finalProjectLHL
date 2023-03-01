import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Children = () => {
  const [children, setChildren] = useState([]);
  const [newChildName, setNewChildName] = useState('');

  useEffect(() => {
    axios.get('/api/children')
      .then(res => {
        setChildren(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleAddChild = () => {
    axios.post('/api/children', { name: newChildName })
      .then(res => {
        setChildren([...children, res.data]);
        setNewChildName('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Children</h1>
      <ul>
        {children.map(child => <li key={child.id}>{child.name}</li>)}
      </ul>
      <input type="text" value={newChildName} onChange={e => setNewChildName(e.target.value)} />
      <button onClick={handleAddChild}>Add Child</button>
    </div>
  );
};

export default Children;