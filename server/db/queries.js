const Pool = require('pg').Pool
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'daycare',
  password: 123,
  port: 5432,
});

const getActivities = () => {
  return pool
    .query(`
    select * from activities;
`)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const createActivity = (body) => {
  return new Promise(function (resolve, reject) {
    const { activity_name, description } = body
    pool.query('INSERT INTO activities (activity_name, description) VALUES ($1, $2) RETURNING *', [activity_name, description], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new activity has been added added: ${results.rows[0]}`)
    })
  })
}
const deleteActivity = () => {
  return new Promise(function (resolve, reject) {
    const id = request.params.id
    pool.query('DELETE FROM activities WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`activity deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getActivities,
  createActivity,
  deleteActivity
}