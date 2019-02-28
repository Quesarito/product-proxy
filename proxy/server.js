const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const port = 3000;

const app = express();
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/products', (req, res) => {
  axios.get('http://54.83.144.162:3002/api/products', {
    params: req.query,
  })
  .then(product => res.status(200).send(product.data))
  .catch(() => console.log('ERROR IN PROXY SERVER /API/PRODUCTS'));
});

app.get('/api/items/:itemId', (req, res) => {
  axios.get(`http://ec2-54-183-132-22.us-west-1.compute.amazonaws.com:8888/api/items/${ req.params.itemId }`)
  .then(items => res.status(200).send(items.data))
  .catch(() => console.log('ERROR IN PROXY SERVER /API/ITEMS/:ITEMID'));
});

app.get('/api/related/:itemId', (req, res) => {
  axios.get(`http://ec2-54-183-132-22.us-west-1.compute.amazonaws.com:8888/api/related/${ req.params.itemId }`)
  .then(relatedItems => res.status(200).send(relatedItems.data))
  .catch(() => console.log('ERROR IN PROXY SERVER /API/RELATED/:ITEMID'));
});

app.get('/api/frequent/:itemId', (req, res) => {
  axios.get(`http://ec2-54-183-132-22.us-west-1.compute.amazonaws.com:8888/api/frequent/${ req.params.itemId }`)
  .then(frequentlyTogether => res.status(200).send(frequentlyTogether.data))
  .catch(() => console.log('ERROR IN PROXY SERVER /API/FREQUENT/:ITEMID'));
});

app.post('/api/messages', (req, res) => {
  // axios.post('http://localhost:8888/api/messages', {
    
  // })
});

app.get('/reviews/:productId', (req, res) => {
  axios.get(`http://ec2-54-153-13-213.us-west-1.compute.amazonaws.com:3003/reviews/${ req.params.productId }`, {
    params: req.query,
  })
  .then(reviewsData => res.status(200).send(reviewsData.data))
  .catch(() => console.log('ERROR IN PROXY SERVER /REVIEWS/:PRODUCTID'))
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`listening on port ${port}`);
});