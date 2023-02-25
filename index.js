//importing express as app builder, mongose for mongoDB to use, body-parser for post method, cors for cross platform resoures sharing.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//creating instance of express() and setting port.
const app = express();
const port = process.env.PORT || 3000;

//listening to port
app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});

// connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });

//defining schema for product
const productSchema = new mongoose.Schema({
    name: String, 
    price: Number,
    brand: String,
    location: String,
    visibleArea: String
  });

//defining model for product
const Product = mongoose.model('products', productSchema);

//using middleware for parsing bodies from URL and json objects and relaxing security for api.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//route for creating a new product
app.post('/products', (req, res) => {
    const product = new Product(req.body); //after receving post request data
    product.save((err) => {
      if (err) {
        res.status(500).send(err); //server error
      } else {
        res.status(201).send(product); //status ok
      }
    });
  });

//route for getting a list of all products
app.get('/products', (req, res) => {
    Product.find((err, products) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(products);
      }
    });
  });

//route for getting an active product
app.get('/products/active', (req, res) => {
    Product.findOne({ visibleArea: 'active' }, (err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(product);
      }
    });
  });

//route for searching products by name, brand, or location
app.get('/products/search', (req, res) => {
    const { name, brand, location } = req.query; //destructing
    const query = {};
    if (name) {
      query.name = new RegExp(name, 'i'); //regular expression for finding patterns
    }
    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }
    if (location) {
      query.visibleArea = location;
    }
    Product.find(query, (err, products) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(products);
      }
    });
  });
  
//route for adding a product to the cart
app.post('/cart', (req, res) => {
    const { name,price,brand,location,visibleArea } = req.body;
    Product.findById(name, (err, product) => {
      if (err) {
        res.status(500).send(err);
      } else if (!product) {
        res.status(404).send('Product not found');
      } else {
        const product = new Product({ name, price, brand, location, visibleArea});
        product.save((err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(product);
          }
        });
      }
    });
  });
  
//route for purchase