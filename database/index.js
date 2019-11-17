const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'cardCollection'
});

pool.connect();

const postCard = function(cardName, cardID, callback) {
  pool.query(`INSERT INTO cards (name, cardID) VALUES ('${cardName}', '${cardID}')`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getCollection = function(callback) {
  pool.query('SELECT * FROM cards', (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const deleteCard = function(cardID, callback) {
  pool.query(`DELETE FROM cards WHERE cardID = ${cardID}`, (error, results, fields) => {
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

module.exports = {
  postCard,
  getCollection,
  deleteCard,
  deleteCollection,
};
