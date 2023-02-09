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
    select * from activities;`)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const updateActivity = (body, id) => {
  const { activity_name, description } = body
  return pool
    .query('UPDATE activities SET activity_name = $1, description = $2 WHERE id = $3;', [activity_name, description, id])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const createActivity = (body) => {
  const { activity_name, description } = body
  return pool
    .query('INSERT INTO activities (activity_name, description) VALUES ($1, $2) RETURNING *', [activity_name, description])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const deleteActivity = (id) => {
  return pool
    .query('DELETE FROM activities WHERE id = $1', [id])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

module.exports = {
  getActivities,
  createActivity,
  deleteActivity,
  updateActivity
}