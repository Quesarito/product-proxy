const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const port = 3000;

const app = express();
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/products', (req, res) => {
  axios.get('http://localhost:3002/api/products', {
    params: req.query,
  })
  .then(product => {
    res.status(200).send(product.data);
  })
  .catch(() => console.log('ERROR IN PROXY SERVER /API/PRODUCTS'));
});

app.get('/api/items/:itemId', (req, res) => {
  axios.get(`http://localhost:8888/api/items/${ req.params.itemId }`)
  .then(({ data }) => {
    res.status(200).send(data);
  })
  .catch(() => console.log('ERORR IN PROXY SERVER /API/ITEMS/:ITEMID'))
});

app.get('/api/related/:itemId', (req, res) => {
  console.log('REQUEST INSIDE /API/RELATED IN PROXY: ', req.params);
  axios.get(`http://localhost:8888/api/related/${ req.params.itemId }`)
  .then(({ data }) => {
    console.log('DATADATADATA: ', data);
    res.status(200).send(data);
  })
  .catch(() => console.log('ERROR IN PROXY SERVER /API/RELATED/:ITEMID'))
});

app.get('api/frequent/:itemId', (req, res) => {
  axios.get(`http://localhost:8888/api/frequent/${ req.query.itemId }`)
  .then(({ data }) => {
    res.status(200).send(data);
  })
  .catch(() => console.log('ERROR IN PROXY SERVER /API/FREQUENT'))

});

app.post('api/messages', (req, res) => {
  axios.post('http://localhost:8888/api/messages', {
    
  })
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`listening on port ${port}`);
});