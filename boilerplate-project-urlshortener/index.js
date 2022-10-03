require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const app = express();
const dns = require("dns")

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const url = []

app.post("/api/shorturl", (req, res)=>{
  let domain = req.body.url.split("/")[2];
  if(!domain){
    return res.json({ error: 'invalid url' })
  }
  dns.lookup(domain, (err, address)=>{
    console.log(req.body.url)
    if(err){
      return res.json({ error: 'invalid url' })
    }
    if(address){
      let num = url.length
      url[num]=req.body.url
      return res.json({
        original_url: url[num],
        short_url: num
      })
    }
  })
})

app.get("/api/shorturl/:num", (req,res)=>{
  console.log(req.params.num)
 res.redirect(url[req.params.num])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
