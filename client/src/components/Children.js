import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table as BootstrapTable, Button, Form, FormControl } from "react-bootstrap";

const Children = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [children, setChildren] = useState([]);

  useEffect(() => {
    getChildren();
  }, []);
  function getChildren() {
    fetch('/children')
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
    function deleteChild(row) {
      let id = row;
      fetch(`/children/${id}`, {
        method: 'DELETE',
      })
    }
    for (const row of selectedRows) {
      deleteChild(row)
    }

    setData(data.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) return;
    console.log(selectedRows)
    // Code to open a modal or form to edit the selected row
    function updateChild(id) {
      let child_name = prompt('Enter child name');
      let notes = prompt('Enter child notes');
      let age_group = prompt('Enter child age group');
      let birthday = prompt('Enter child age birthday');
      fetch(`/children/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ child_name, notes, birthday, age_group }),
      })
    }
    updateChild(selectedRows[0]);
    getChildren();
  };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const child = children.map((child) => {
    const name = child.child_name
    const key = child.id
    return <li key={key}>{name}</li>
  })

  return (
    <div>
      {children ? child : 'There is no activity data available'}
      <h1>Children List</h1>
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
              <td>{item.birthday.slice(0, 10)}</td>
              <td>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default Children;