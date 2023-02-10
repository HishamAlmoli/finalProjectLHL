const Pool = require('pg').Pool
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'daycare',
  password: 123,
  port: 5432,
});

const getChildren = () => {
  return pool
    .query(`
    select * from children;`)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

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

const createChild = (body) => {
  return new Promise(function (resolve, reject) {
    const { child_name, notes, birthday, age_group } = body
    pool.query('INSERT INTO children (parent_id, child_name, notes, birthday, age_group) VALUES (1, $1, $2, $3, $4) RETURNING *', [child_name, notes, new Date.getTime(), age_group], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new child has been added added: ${results.rows[0]}`)
    })
  })
}
const deleteChild = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM children WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`child deleted with ID: ${id}`)
    })

  })

}

const updateChild = (body, id) => {
  const { child_name, notes, birthday, age_group } = body
  console.log('id', id)
  return pool
    .query('UPDATE children SET parent_id = 1, child_name = $1, notes = $2, birthday = $3, age_group = $4 WHERE id = $5;', [child_name, notes, new Date(birthday), age_group, id])
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
  updateActivity,
  getChildren,
  createChild,
  deleteChild,
  updateChild
}