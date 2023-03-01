const express = require('express')
const app = express()
const port = 3001
const { getActivities, createActivity, deleteActivity } = require('./queries')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  getActivities()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

// app.post('/children', (req, res) => {
//   const { child_name, age_group, birthday, notes } = req.body;

//   const newChild = {
//     id: data.length + 1,
//     child_name,
//     age_group,
//     birthday,
//     notes
//   };

//   data.push(newChild);

//   res.status(201).json(newChild);
// });

app.post("/children", (req, res) => {
  const { child_name, age_group, birthday, notes } = req.body;

  if (!child_name || !age_group || !birthday) {
    return res.status(400).send("child_name, age_group, and birthday are required.");
  }

  const child = {
    child_name,
    age_group,
    birthday,
    notes,
  };

  const sql = "INSERT INTO children SET ?";
  db.query(sql, child, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to add child to database.");
    }

    child.id = result.insertId;
    res.status(201).json(child);
  });
});

app.post('/activities', (req, res) => {
  createActivity(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/activities/:id', (req, res) => {
  deleteActivity(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})