const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mtg = require('mtgsdk');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/cards/:card_name', (req, res) => {
  let cardName = req.params.card_name;
  mtg.card.where({name: `${cardName}`})
  .then(results => {
    res.status(200).send(results);
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));