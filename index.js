const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const currencyFormatter = require('currency-formatter');
const app = express();
const db = require('./models');

db.sequelize.sync().then(() => {
  app.set('view engine', 'ejs');

  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Web homepage of app
  app.get("/", function(req, res) {
    db.Product.findAll().then(products => {
      console.log(products[0].get('name'));
      products = products.map(p => {
        return {
          name: p.name,
          price: currencyFormatter.format(p.price / 100, { locale: 'en-US' }),
        };
      });
      app.render("home", {products: products}, (err, contents) => {
        res.render("layout", {contents: contents});
      });
    });
  });

  // API index for products
  app.get("/api/products", function(req, res) {
    db.Product.findAll().then(products => {
      console.log(`found ${products.length} products`);
      res.json(products);
    })
  })

  // API create for products
  app.post("/api/products", function(req, res) {
    console.log("posting a new product");
    const newProduct = {
      name: req.body.name,
      price: req.body.price
    }
    db.Product.create(newProduct).then(savedProduct => {
      res.redirect("/")
    })
  })

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
  });
})
