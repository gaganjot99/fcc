const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
}); 

let id = 1000;

users = {}
exercises = []

app.get("/api/users", (req, res)=>{
  let arr = []
  for (let i=1000; i<id; i++){
       arr.push(users[i])
  }
  res.json(arr)
})

app.post("/api/users",(req,res)=>{
  let user = req.body.username
  users[id] = {username: user, _id: id+""}
  exercises.push([])
  id++;
  res.json(users[id-1])
})

app.post("/api/users/:id/exercises", (req, res)=>{
  let body = req.body
  if(!body.date){
    body.date = new Date().toDateString()
  }
  let exer = {
    description: body.description,
    duration : +body.duration,
    date: new Date(body.date).toDateString()
  }
  exercises[req.params.id-1000].push(exer)
  res.json({...exer,
  username: users[req.params.id].username,
  _id: req.params.id
  })
})

app.get("/api/users/:id/logs", (req, res)=>{
  let arr = exercises[req.params.id-1000]
  let query = req.query
  let from = new Date(query.from).getTime()
  let to = new Date(query.to).getTime()
  let limit = query.limit
  if(!from && !to && !limit){
    return res.json({
      ...users[req.params.id],
      count: exercises[req.params.id-1000].length,
      log: exercises[req.params.id-1000]
    })
  }
  let newArr =[]
  for(let i =0 ; i< arr.length; i++){
    if(from){
      if(new Date(arr[i].date).getTime()<from)
      continue
    }
    if(to){
      if(new Date(arr[i].date).getTime()>to)
      continue
    }
    newArr.push(arr[i])
    if(limit){
      if(newArr.length>=limit){
        break
      }
    }
  }
  
  res.json({
    ...users[req.params.id],
    count: newArr.length,
    log: newArr
  })
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
