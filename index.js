const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("layout");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
