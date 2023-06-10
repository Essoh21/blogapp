const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./src/models/blog");
const { render } = require("ejs");
// express app
const app = express();
const port = 8000;

// connecting to monggodb using mongoose library
// mongodb connect uri
const dbURI =
  "mongodb+srv://essohalou:nodeblogpass21@node-blog.ccomzyl.mongodb.net/";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => {
      console.log(`server running on port: ${port}`);
    })
  )
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.set("views", "src");
// a third party middleware named morgan
app.use(morgan("dev"));

// middleware and stactic data (css, images,videos...)
app.use(express.static("./src/public"));
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
//middleware urlencoded
app.use(express.urlencoded({ extended: true }));
app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});
// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "all blogs", blogs: result });
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((reslutl) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "blog details" });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        redirect: "/blogs",
      });
    })
    .then((error) => {
      console.log(error);
    });
});
app.get("/create", (req, res) => {
  res.render("create", { title: "new " });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
