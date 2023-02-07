const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({title: "Add New Child Page"});
});

module.exports = router;
