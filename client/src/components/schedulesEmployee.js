import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table as BootstrapTable, Button, Form, FormControl } from "react-bootstrap";

const Activites = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //---
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

  useEffect(() => {
    fetch("http://localhost:3000/activites")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((i) => i !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) return;

    // Code to delete selected rows from the database

    setData(data.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) return;

    // Code to open a modal or form to edit the selected row
  };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  //---
  const activity = activities.map((activity) => {
    const name = activity.activity_name
    const key = activity.id
    return <li>{name}</li>
  })
  return (
    <div>
    {/* {activities ? activity : 'There is no activity data available'} */}
        <h1>Activites Schedule - Admin mode</h1>
      <Form inline className="mb-3">
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
            <th>Description</th>
            <th>Out of daycare</th>
          </tr>
        </thead>
        <tbody>
          {/* {filteredData.map((item) => ( */}
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleRowSelection(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.activity_name}</td>
              <td>{item.description}</td>
              <td>{item.out_of_daycare}</td>
              {/* <td>{{item.out_of_daycare} ? Ouside : Inside}</td> */}
              {/* <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.Description}</td>
              <td>{item.out}</td> */}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default Activites;