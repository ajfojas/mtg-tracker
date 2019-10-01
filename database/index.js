const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'cardCollection',
});

pool.connect();

const postCard = function (image, callback) {
  pool.query(`INSERT INTO photos (src, description, listingID) VALUES ('https://bnbair.s3-us-west-1.amazonaws.com/${randomInt(100)}.jpg', '${faker.lorem.sentence()}', ${listingID})`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const deleteCollection = function (listingID, photoID, callback) {
  pool.query(`DELETE FROM photos WHERE listingID = ${listingID} AND id = ${photoID}`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  pool,
  postCard,
  deleteCollection,
};
