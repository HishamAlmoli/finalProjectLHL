import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


function AddChild() {
  const [formData, setFormData] = useState({
    name: "",
    notes: "",
    birthdate: ""
  });

  function createChild() {
    let child_name = formData.name
    let notes = formData.notes
    let birthday = formData.birthdate
    let age_group = formData.age_group
    fetch('/children', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ child_name, notes, birthday, age_group }),
    })
  }

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    createChild(formData);
    console.log(formData);
  };


  // return (
  //     <div>
  //         Add New Child Page
  //     </div>
  // )

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-light">
      <h1>Add a new Child</h1>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Age group</label>
        <textarea
          name="age_group"
          value={formData.age_group}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Birthdate:</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddChild