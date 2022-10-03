const express = require("express");

const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

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

// blog routes

app.use("/blogs", blogRoutes);

// 404 page

app.use((req, res, next) => {
  res.status(404).render("404", { title: "404" });
  next();
});
