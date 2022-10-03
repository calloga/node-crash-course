const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All blogs ", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((blog) => {
    res.render("blogs/details", { title: blog.title, blog: blog });
  });
};

const blog_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
};

const blog_create = (req, res) => {
  res.render("blogs/create", { title: "New Blog" });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((blog) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_post,
  blog_create,
  blog_delete,
};
