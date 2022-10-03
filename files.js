const fs = require("fs");

// //reading files

// fs.readFile("./docs/blog1.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// // writing files

// fs.writeFile("./docs/blog1.txt", "hello, world", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("done writing in blog1.txt");
// });

// directories

// if (!fs.existsSync("./assets")) {
//   fs.mkdir("./assets", (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("created directory");
//   });
// } else {
//   fs.rmdir("./assets", (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("deleted directory");
//   });
// }

// deleting files

if (!fs.existsSync("./docs/blog2.txt")) {
  fs.writeFileSync("./docs/blog2.txt", "hi, again", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("created file");
  });
} else {
  fs.unlink("./docs/blog2.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("deleted");
  });
}
