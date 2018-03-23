const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');

db.sequelize.sync().then(() => {
  app.set('view engine', 'ejs');

  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Web homepage of app.
  app.get("/", function(req, res) {
    res.render("layout", {contents: "homepage"});
  });

  // API index for products
  app.get("/api/products", function(req, res) {
    db.Product.findAll().then(products => {
      console.log(`found ${products.length} products`);
      res.json(products);
    })
  })

  app.post("/api/products", function(req, res) {
    console.log("posting a new product");
    const newProduct = {
      name: req.body.name,
      price: req.body.price
    }
    db.Product.create(newProduct).then(savedProduct => {
      res.json(savedProduct);
    })
  })

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
  });
})
