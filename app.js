const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");
const { nextTick } = require("process");
const { blob } = require("stream/consumers");
const { result } = require("lodash");

const blogs = [
  {
    title: "Yoshi says their truth",
    snippet:
      "Lorem Ipsum is true and accurate enough for my purposes and for my purposes too",
  },
  {
    title: "Mario says their truth",
    snippet:
      "Lorem Ipsum is true and accurate enough for my purposes and for my purposes too",
  },
  {
    title: "Calloga says their truth",
    snippet:
      "Lorem Ipsum is true and accurate enough for my purposes and for my purposes too",
  },
];
// express app

const app = express();
// connect to MongoDB
const dbURI =
  "mongodb+srv://calloga:passer@nodetuts.ydjpbyi.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// register view engine

app.set("view engine", "ejs");
// listen for requests

// middleware & static files

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New Blog" });
});

// blog routes

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs ", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/blogs", function (req, res) {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(res.redirect("/blogs"))
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((blog) => {
    res.render("details", { title: blog.title, blog: blog });
  });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((blog) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});
// app.get("/single-", (req, res) => {
//   Blog.findById("633a765f25cecc046a45f5e0")
//     .then((blog) => {
//       res.render();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// 404 page

app.use((req, res, next) => {
  res.status(404).render("404", { title: "404" });
  next();
});
