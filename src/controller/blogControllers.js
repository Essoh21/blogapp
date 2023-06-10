const Blog = require("../models/blog");
const blogIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "all blogs", blogs: result });
    });
};

const blogCreateSave = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((reslutl) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
};

const blogDetails = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "blog details" });
    })
    .catch((error) => {
      res.status(404).render("404", { title: "Blog not found:)" });
    });
};

const blogDelete = (req, res) => {
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
};

module.exports = {
  blogIndex,
  blogCreateSave,
  blogDetails,
  blogDelete,
};
