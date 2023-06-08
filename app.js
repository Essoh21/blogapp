const express = require("express");
// express app
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", "src");
app.get("/", (req, res) => {
  const blogs = [
    { title: "first blog", snippet: "something here to display as blog" },
    {
      title: "second blog",
      snippet: "another thing to display here as content of the blog",
    },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});
app.get("/create", (req, res) => {
  res.render("create", { title: "new " });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
