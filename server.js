const http = require("http");
const _ = require("lodash");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // lodash

  const num = _.random(1, 20);
  console.log(`num: ${num}`);

  const greet = _.once(() => {
    console.log("hello");
  });

  greet();
  greet();
  // set headers content type

  res.setHeader("Content-Type", "text/html");
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;

    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }
  console.log(path);
  // send html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000");
});
