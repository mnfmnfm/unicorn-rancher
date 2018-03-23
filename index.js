const express = require('express');
const ejs = require('ejs');
const app = express();
const db = require('./models');

db.sequelize.sync().then(() => {
  app.set('view engine', 'ejs');

  app.use(express.static("public"));

  // Web homepage of app.
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

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
  });
})
