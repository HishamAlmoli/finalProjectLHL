const express = require('express');
const router = express.Router();
const {getChildren} = require('../db/queries');

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
