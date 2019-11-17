const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mtg = require('mtgsdk');
const db = require('../database/index.js');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/cards/:cardName', (req, res) => {
  let { cardName } = req.params;
  mtg.card.where({name: `${cardName}`})
  .then(results => {
    res.status(200).send(results);
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

app.post('/api/collection/:cardName/:cardID', (req, res) => {
  let { cardName, cardID } = req.params;
  db.postCard(cardName, cardID, (error, data) => {
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