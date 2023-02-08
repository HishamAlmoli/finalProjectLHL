import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


function AddChild() {
    const [formData, setFormData] = useState({
        name: "",
        notes: "",
        birthdate: ""
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