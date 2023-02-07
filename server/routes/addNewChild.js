const express = require('express');
const router = express.Router();

/* GET users listing. */

//fake database

const childrenDatabase = {
    1: {
        name : 'Sam',
        families_id: '1',
        birthDate: '1,13,2023'
    }
}

router.get('/', (req, res) => {
//   res.json({title: "Add New Child Page"});
res.json({childrenDatabase});
});

module.exports = router;
