const [formData, setFormData] = useState({
  parent_id: '',
  child_name: '',
  notes: '',
  birthday: '',
  age_group: ''
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = (event) => {
  event.preventDefault();
  axios.post("http://localhost:3000/children", formData)
    .then((res) => {
      setData([...data, res.data]);
      setFormData({
        parent_id: '',
        child_name: '',
        notes: '',
        birthday: '',
        age_group: ''
      });
    })
    .catch((err) => console.error(err));
};

return (
  <div>
    <h2>To Add Children</h2>
    {children.map((child) => (
      <div key={child.id}>
        <h3>{child.name}</h3>
        <p>Age: {child.age}</p>
      </div>
    ))}
    <form onSubmit={handleSubmit}>
      <h3>Add Child</h3>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <button type="submit">Add Child</button>
    </form>
  </div>
);

// return (
//   <div>
//     <h1>Children List</h1>
//     <Button variant="primary" onClick={handleAdd}>
//       Add Child
//     </Button>
//     <BootstrapTable striped bordered hover>
//       <thead>
//         <tr>
//           <th>Select</th>
//           <th>Child ID</th>
//           <th>Parent ID</th>
//           <th>Child Name</th>
//           <th>Notes</th>
//           <th>Birthday</th>
//           <th>Age Group</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((child) => (
//           <tr key={child.id} onClick={() => handleRowSelection(child.id)}>
//             <td>
//               <Form.Check
//                 type="checkbox"
//                 checked={selectedRows.includes(child.id)}
//                 onChange={() => handleRowSelection(child.id)}
//               />
//             </td>
//             <td>{child.id}</td>
//             <td>{child.parent_id}</td>
//             <td>{child.child_name}</td>
//             <td>{child.notes}</td>
//             <

