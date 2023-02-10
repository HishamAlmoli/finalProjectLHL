import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table as BootstrapTable, Button, Form, FormControl } from "react-bootstrap";

const Activities = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getActivities();
  }, []);
  function getActivities() {
    fetch('/activities')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        setData(data);
      });
  }

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
    function deleteActivity(row) {
      let id = row;
      fetch(`/activities/${id}`, {
        method: 'DELETE',
      })
    }
    for (const row of selectedRows) {
      deleteActivity(row)
    }
    setData(data.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) return;

    // Code to open a modal or form to edit the selected row
    function updateActivity(id) {
      let activity_name = prompt('Enter activity name');
      let description = prompt('Enter activity desctiption');;
      fetch(`/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity_name, description }),
      })
    }
    updateActivity(selectedRows[0]);
    getActivities();
  };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <h1>Activities List</h1>
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
              {item.out_of_daycare}
              {/* <td>{{item.out_of_daycare} ? Ouside : Inside}</td> */}
              {item.out_of_daycare === true ?
                <td>Ouside Activity</td> :
                <td>Inside Activity</td>}
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

export default Activities;