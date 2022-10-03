require('dotenv').config();
const { Number } = require('mongoose');
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log("connected to database")
}).catch((err)=>console.log(err));

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  }

});

let Person = mongoose.model("Person", personSchema )

const createAndSavePerson = (done) => {
  const newPerson = new Person({name: "joe trib", age: 39, favoriteFoods: ["pusky","asky"]})
  newPerson.save(function(err, data){
    if(err) return console.log(err)
    done(null , data);
  })
  
};

let arrayOfPeople = [{name: "jess", age: 39, favoriteFoods: ["pusky","asky"]},{name: "moe trib", age: 39, favoriteFoods: ["pusky","asky"]}]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err, data){
    if(err) return console.log(err)
    done(null , data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).then((data, err)=>{
    if(err) return console.log(err)
    done(null , data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).then((data, err)=>{
    if(err) return console.log(err)
    done(null , data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}).then((data, err)=>{
    if(err) return console.log(err)
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}).then((data, err)=>{
    if(err) return console.log(err)
    data.favoriteFoods.push(foodToAdd)
    data.save(function(err, data){
      if(err) return console.log(err)
      done(null , data);
    })
});
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age: ageToSet},{new: true}).then((data, err)=>{
    if(err) return console.log(err)
    done(null , data);
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}).then((data, err)=>{
    if(err) return console.log(err)
    done(null , data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}).then((data, err)=>{
    if(err) return console.log(err)
    done(null , data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data)=>{
    if(err) return console.log(err)
    done(null , data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
