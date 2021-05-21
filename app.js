//Headers
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());//?
app.use(bodyParser.urlencoded({extended:true}));//use body-parser to grab the data from the html file we want
app.set('view engine', 'ejs');//to use ejs with express
app.use(express.static("public"));//use static files like style.css and js

//require mongoose
const mongoose = require ('mongoose');

//connect db
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});
const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty okay"
});

const kiwi = new Fruit({
  name: "kiwi",
  rating: 8,
  review: "Pretty okay"
});

const banana = new Fruit({
  name: "banana",
  rating: 9,
  review: "Pretty okay"
});

const organge = new Fruit({
  name: "organge",
  rating: 7,
  review: "Pretty okay"
});

Fruit.insertMany([kiwi, banana, organge], function(err){
if (err){
  console.log(err);
}else{
  console.log("Success!");
}
});



const personSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  rating: Number,
  review: String
});
const Person = mongoose.model("Person",personSchema);

const person = new Person({
  name: "Jonh",
  lastname: "Doe",
  rating: 7,
  review: "Pretty okay"
});

person.save();



//get function will send information to the brower at loading
app.get("/", function(req, res){
  // console.log(req);
  // res.sendFile();
  // res.sendFile(__dirname + "/index.html");
  // res.send(__dirname);

//ejs
res.render('home');
})

//post function will receive information from the browser to the server
app.post("/", function(req, res){
  res.send("The results of ");
  res.redirect("/");//redirects to app.get function or another function
})
//process.env.PORT || heroku code
app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000")
});
