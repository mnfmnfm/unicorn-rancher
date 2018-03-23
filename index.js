const express = require('express');
const ejs = require('ejs');
const currencyFormatter = require('currency-formatter');
const app = express();
const db = require('./models');

db.sequelize.sync().then(() => {
  app.set('view engine', 'ejs');

  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Web homepage of app
  app.get("/", function(req, res) {
        res.render("layout");
  });

  // API index for products
  app.get("/api/products", function(req, res) {
    db.Product.findAll().then(products => {
      console.log(`found ${products.length} products`);
      res.json(products);
    })
  })

  // unicorn index
  app.get("/api/unicorns", function(req, res) {
    db.Unicorn.findAll().then(unicorns => {
      res.json(unicorns);
    });
  });

  // unicorn update (just location)
  app.put("/api/unicorns/:id", function(req, res) {
    db.Unicorn.update(
      { location: req.body.location },
      { where: { id: req.params.id }, returning: true }
    ).then((stuff) => {
      res.json(stuff[1][0])
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
