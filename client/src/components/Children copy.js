import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table as BootstrapTable, Button, Form, FormControl } from "react-bootstrap";
import axios from 'axios';

const Children = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch("http://localhost:3000/children")
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     setData(result);
    //   });
    setIsLoading(true);
  axios
    .get("http://localhost:3000/children")
    .then((res) => {
      setData(res.data);
      setIsLoading(false);
      console.log('data1', res.data);
    })
    .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((i) => i !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      alert("No rows selected");
      return;
    }

    // Code to delete selected rows from the database
    selectedRows.forEach(id => {
      // Code to send the request to the API with the selected id
      fetch(`http://localhost:3000/children/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Code to handle the response from the API
          //getActivities();
        })
        .catch(error => {
          console.error(error);
        });
    });

    setData(data.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) return;

    // Code to open a modal or form to edit the selected row
  };

  const handleAdd = () => {
    // Code to open a modal or form to add a new row
  };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  
  return (
    <div>
        <h1>Children List</h1>
      <Form className="mb-3">
        <FormControl
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="danger" onClick={handleDelete} className="ml-2">
          Delete
        </Button>
        <Button variant="primary" onClick={handleEdit} className="ml-2">
          Edit
        </Button>
        <Button variant="primary" onClick={handleAdd} className="ml-2">
          Add
        </Button>
      </Form>
      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedRows.length === data.length &&
                  data.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(data.map((item) => item.id));
                  } else {
                    setSelectedRows([]);
                  }
                }}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Group</th>
            <th>Birthdate</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleRowSelection(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.child_name}</td>
              <td>{item.age_group}</td>
              <td>{item.birthday}</td>
              <td>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default Children;