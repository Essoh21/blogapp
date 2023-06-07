const express = require("express");
// express app
const app = express();

app.set("view engine", "ejs");
app.set("views", "src");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/create", (req, res) => {
  res.render("create");
});

app.use((req, res) => {
  res.status(404).render("404");
});
app.listen(3000);
