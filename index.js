const express = require('express');
const app = express();
const db = require('./models');

db.sequelize.sync().then(() => {

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));

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

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
  });
})
