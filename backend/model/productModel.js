const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: String,
});

const Products = mongoose.model('product', productSchema);

module.exports = Products;

// {
//     "id": 1,
//     "title": "Fjallraven  Foldsack No 1 Backpack Fits 15 Laptops",
//     "price": 329.85,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "sold": false,
//     "dateOfSale": "2021-11-27T20:29:54+05:30"
// },
