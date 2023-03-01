const Pool = require('pg').Pool
const pool = new Pool({
  user: 'hishamalmoli',
  host: 'localhost',
  database: 'daycare',
  password: '',
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
const deleteActivity = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM activities WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`activity deleted with ID: ${id}`)
    })
  })
}

const getChildren = () => {
  return pool
    .query(`
    select * from children;
`)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

// const addChild = (body) => {
//   return new Promise(function (resolve, reject) {
//     const { child_name, notes, birthday, age_group } = body
//     pool.query('INSERT INTO children (parent_id, child_name, notes, birthday, age_group) VALUES (1, $1, $2, $3, $4) RETURNING *', [child_name, notes, birthday, age_group], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`A new child has been added: ${results.rows[0]}`)
//     })
//   })
// }
const addChild = (body) => {
  return new Promise(function (resolve, reject) {
    const { parent_id, child_name, notes, birthday, age_group } = body
    // pool.query('INSERT INTO children (parent_id, child_name, notes, birthday, age_group) VALUES ($1, $2, $3, $4, $5) RETURNING *', [parent_id, child_name, notes, birthday, age_group], (error, results) => {
    pool.query("INSERT INTO children (parent_id, child_name, notes, birthday, age_group) VALUES (1, 'testName', 'testNote', '1,13,2023', 1) RETURNING *;")
    // pool.query('INSERT INTO children (parent_id, child_name, notes, birthday, age_group) VALUES (1, testName, testNote, "1,13,2023", 1) RETURNING *', [parent_id, child_name, notes, birthday, age_group], (error, results) => {
    //   if (error) {
    //     reject(error)
    //     console.log("error: ", error);
    //   }
    //   resolve(results.rows[0])
    // })
  })
 }
 
const deleteChild = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM children WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
        console.log("error: ", error);
      }
      resolve(`Child is deleted with ID: ${id}`)
    })
  })
}



module.exports = {
  getActivities,
  createActivity,
  deleteActivity,
  getChildren,
  addChild,
  deleteChild
}