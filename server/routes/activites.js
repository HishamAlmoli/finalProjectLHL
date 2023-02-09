const express = require('express');
const router = express.Router();
const {getActivities} = require('../db/queries');

/* GET users listing. */

router.get('/', (req, res) => {
res.set({
    'Content-Type': 'text/plain'
  }); 
getActivities().then(data => {
  console.log(data);
  return res.send(data);  
})
});

module.exports = router;
