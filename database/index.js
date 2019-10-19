const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'cardCollection'
});

pool.connect();

const getCollection = function(callback) {
  pool.query('SELECT * FROM cards', (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const deleteCollection = function(callback) {
  pool.query('DELETE FROM cards', (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const postCard = function(name, id, callback) {
  console.log(name, id)
  pool.query(`INSERT INTO cards (name, id) VALUES ('${name}', '${id}')`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  pool,
  getCollection,
  deleteCollection,
  postCard
};
