const express = require('express')
const app = express()
const port = 3001
const { getActivities, createActivity, deleteActivity, updateActivity, getChildren, createChild, deleteChild, updateChild } = require('./queries')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/children', (req, res) => {
  getChildren()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get('/activities', (req, res) => {
  getActivities()
    .then(response => {
      res.status(200).send(response);

    })
    .catch(error => {
      res.status(500).send(error);
    })
})


app.post('/activities', (req, res) => {
  createActivity(req.body)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error);
    })
  res.redirect('/')
})

app.put('/activities/:id', (req, res) => {
  updateActivity(req.body, req.params.id)
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

app.post('/children', (req, res) => {
  createChild(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.put('/children/:id', (req, res) => {
  updateChild(req.body, req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/children/:id', (req, res) => {
  deleteChild(req.params.id)
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