const express = require("express");
const multer = require("multer");
const cors = require("cors");
const http = require("http");
const fs = require("fs");

const port = 4000;
const app = express();

app.use(cors());

app.get("/",(req,res)=>{
  res.send("Welcome to Express App test");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

//var upload = multer({ dest: "uploads/" });

var upload = multer({ storage: storage });

app.post("/file", upload.single("file"), function (req, res, next) {
  const file = req.file;
  if (file) {
    res.json(req.file);
  } else throw "error";
});

app.post("/multiplefiles", upload.array("files"), function (req, res, next) {
  const files = req.files;
  if (Array.isArray(files) && files.length > 0) {
    res.json(req.files);
  } else {
    res.status(400);
    throw new Error("No file");
  }
});

const server = http.createServer(function(req, res) {
  let img = __dirname + "/540892.jpeg";

  fs.access(img, fs.constants.F_OK, err => {
    //check that we can access  the file
    console.log(`${img} ${err ? "does not exist" : "exists"}`);
  });

  fs.readFile(img, function(err, content) {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>No such image</h1>");
    } else {
      //specify the content type in the response will be an image
      res.writeHead(200, { "Content-type": "image/jpeg" });
      res.end(content);
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

server.listen(4001, function() {
  console.log(`Server running on port http://localhost:4001`);
});