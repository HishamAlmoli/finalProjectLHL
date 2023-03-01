const express = require('express');
const router = express.Router();
const {getChildren, addChild} = require('../db/queries');

router.post('/', (req, res) => {
  const { parent_id, child_name, notes, birthday, age_group } = req.body;

  addChild({ parent_id, child_name, notes, birthday, age_group })
    .then(data => {
      console.log(data);
      return res.send(data); 
    })
    .catch(error => {
      console.log(error);
      return res.status(500).send(error);
    });
});

/* GET users listing. */
router.get('/', (req, res) => {
res.set({
    'Content-Type': 'text/plain'
  }); 
  getChildren().then(data => {
  console.log(data);
  return res.send(data);  
})
});

module.exports = router;
