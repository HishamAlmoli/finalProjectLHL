import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


function AddActivity() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        out: false
      });
    
      const handleChange = event => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };
    
      const handleSubmit = event => {
        event.preventDefault();
        // Perform some action with the form data
        console.log(formData);
      };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-light">
            <h1>Add a new Activity</h1>
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
            <label>description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>out:</label>
            <input
              type="checkbox"
              name="out"
              value={formData.out}
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

export default AddActivity