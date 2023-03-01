import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table as BootstrapTable, Button, Form, FormControl } from "react-bootstrap";
import axios from 'axios';
import AddChild from "./AddChild";

const CHILDREN_LOCAL_STORAGE_KEY = "childrenData";

const Children = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  // const [childrenData, setchildrenData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(CHILDREN_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const childrenData = JSON.parse(localStorage.getItem(CHILDREN_LOCAL_STORAGE_KEY));
    if (childrenData) {
      setData(childrenData);
    }
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/children")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        console.log("data1", res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      alert("No rows selected");
      return;
    }
    axios
    .delete(`http://localhost:3000/children/${selectedRows}`)
    .then(() => {
      fetchData();
      setSelectedRows([]);
    })
    .catch((err) => console.error(err));
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) return;

    // Code to open a modal or form to edit the selected row
    setSelectedChild(data.find((item) => item.id === selectedRows[0]));
  };

  const handleAdd = () => {
    // Code to open a modal or form to add a new row
    setSelectedChild({});
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h1>Children</h1>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="outline-success" onClick={() => setSelectedChild({})}>
          Add Child
        </Button>
      </Form>

      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((child) => (
            <tr key={child.id}>
              <td>{child.name}</td>
              <td>{child.age}</td>
              <td>{child.gender}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedRows.includes(child.id)}
                  onChange={() => handleRowSelection(child.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>

      <div style={{ marginTop: "10px" }}>
        <Button variant="danger" onClick={handleDelete} disabled={!selectedRows.length}>
          Delete
        </Button>
      </div>

      <AddChild
        child={selectedChild}
        onClose={() => setSelectedChild(null)}
        onSave={() => {
          fetchData();
          setSelectedChild(null);
        }}
      />
    </div>
  );
};

export default Children;