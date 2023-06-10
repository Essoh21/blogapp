const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./src/routes/blogRoutes/blogRoutes");
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
app.set("views", "src/views");
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
app.use("/blogs", blogRoutes);
app.get("/create", (req, res) => {
  res.render("create", { title: "new " });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
