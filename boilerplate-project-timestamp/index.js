// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/", (req, res) => {
  let time = new Date();
  res.json({ unix: +time, utc: time.toUTCString() });
});

app.get(
  "/api/:date",
  (req, res, next) => {
    let params;
    if (req.params.date.length === 13) {
      params = +req.params.date;
    } else {
      params = req.params.date;
    }
    req.time = new Date(params);
    next();
  },
  (req, res) => {
    if (req.time.toString() == "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    res.json({ unix: +req.time, utc: req.time.toUTCString() });
  }
);

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
