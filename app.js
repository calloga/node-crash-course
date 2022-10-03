const express = require("express");

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

// register view engine

app.set("view engine", "ejs");
// listen for requests

app.listen(3000);

app.get("/", (req, res) => {
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New Blog" });
});
// 404 page

app.use((req, res) => {
  res.status(404).render("404");
});
