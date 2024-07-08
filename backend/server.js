const mongoose = require('mongoose');
const app = require('./app');
const Products = require('./model/productModel');

mongoose
  .connect('mongodb://localhost:27017/ethnus')
  .then(() => console.log('DB connect successfully'))
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Listing of port 3000');
});
