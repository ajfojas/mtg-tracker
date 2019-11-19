const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mtg = require('mtgsdk');
const db = require('../database/index.js');
const redis = require('redis');
const redisPort = 6379;
const redisClient = redis.createClient(redisPort);

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let cacheSearch = (req, res, next) => {
  let { cardName } = req.params;
  cardName = cardName.toLowerCase();
  redisClient.get(`${cardName}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    if (data !== null) {
      res.status(200).send(JSON.parse(data));
    } else {
      next();
    }
  });
};

app.get('/api/cards/:cardName', cacheSearch, (req, res) => {
  let { cardName } = req.params;
  cardName = cardName.toLowerCase();
  mtg.card.where({name: `${cardName}`})
  .then(results => {
    redisClient.setex(`${cardName}`, 3600, JSON.stringify(results));
    res.status(200).send(results);
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

app.post('/api/collection/:cardID/:imageURL/:cardName', (req, res) => {
  let { cardID, imageURL, cardName } = req.params;
  db.postCard(cardID, imageURL, cardName, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/api/collection', (req, res) => {
  db.getCollection((error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.delete('/api/collection/:cardID', (req, res) => {
  let { cardID } = req.params;
  db.deleteCard(cardID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.delete('/api/collection', (req, res) => {
  db.deleteCollection((error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));