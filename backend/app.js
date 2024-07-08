const express = require('express');
const cors = require('cors');
const Products = require('./model/productModel');
const productRouter = require('./routes/productRouter');

const app = express();

app.use(
  cors({
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })
);

app.use('/', productRouter);

module.exports = app;
