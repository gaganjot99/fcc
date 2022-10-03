require('dotenv').config()
let express = require('express');
const bodyParser = require("body-parser")
let app = express();
console.log("Hello World!")
app.use((req, res, next)=>{
    console.log(req.method+ " " + req.path + " - "+ req.ip)
    next()
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})
app.use("/public", express.static("public"))
app.get("/json", (req, res)=>{
    if(process.env.MESSAGE_STYLE==="uppercase"){
    return res.json({"message": "HELLO JSON"});
    }
    return res.json({"message": "Hello json"});
})
app.get("/now",(req,res,next)=>{
    req.time = new Date().toString()
    next()
},(req,res)=>{
    res.json({time: req.time})

})
app.get("/:word/echo", (req,res)=>{
    res.json({echo: req.params.word})
})
app.route("/name").get((req,res)=>{
    res.json({name: req.query.first+ " " + req.query.last})
})
app.use(bodyParser.urlencoded({extended: false}))
app.post("/name",(req,res)=>{
    res.json({name: req.body.first+" "+req.body.last})
})






































 module.exports = app;
