import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddChild = () => {
  // Add state variables for form input fields
  const [childName, setChildName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [birthday, setBirthday] = useState('');
  const [notes, setNotes] = useState('');

  // Add function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new child object with input field values
    const newChild = {
      child_name: childName,
      age_group: ageGroup,
      birthday,
      notes
    };

    // Send a POST request to the server to add the child to the database
    axios.post('http://localhost:3000/children', newChild)
      .then(res => {
        console.log(res.data);
        // Reset form input fields
        setChildName('');
        setAgeGroup('');
        setBirthday('');
        setNotes('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Add Child</h1>
      <Form onSubmit={handleSubmit}>
        // Add form input fields and labels
        <Form.Group controlId="formChildName">
          <Form.Label>Child Name</Form.Label>
          <Form.Control
            type="text"
            value={childName}
            onChange={(event) => setChildName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAgeGroup">
          <Form.Label>Age Group</Form.Label>
          <Form.Control
            type="text"
            value={ageGroup}
            onChange={(event) => setAgeGroup(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(event) => setBirthday(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </Form.Group>
        // Add a submit button
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddChild;