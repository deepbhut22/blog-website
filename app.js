//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/blogDB");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let again ="";
const app = express();
const postschema = {
  title : String,
  postbody : String
}

const Post = mongoose.model("Post" , postschema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){

  Post.find({}).then((foundposts)=>{
    res.render("home" , {homecontent : homeStartingContent , added: foundposts})
  });
})

app.get("/about",function(req,res){
  res.render("about",{aboutcontent: aboutContent})
})

app.get("/contact",function(req,res){
  res.render("contact",{contactcontent: contactContent})
})

app.get("/posts/:postname",function(req,res){
  const requestedpost = _.lowerCase(req.params.postname);

  posts.forEach(function(post){
    const storedtitle = _.lowerCase(post.title);

    if(storedtitle === requestedpost){
        res.render("post",{pt : post.title , pb : post.postbody})
    }
  })
})

app.get("/compose",function(req,res){
  res.render("compose",{tryy : again})
})


app.post("/compose",function(req,res){
  let id = req.body.id;
  let pass = req.body.pass;
  if(id === "deepbhut22" && pass === "d"){
      res.render("check",{tryy : again})
  }
  else{
    again += "try again";
    res.render("compose",{tryy : again})
    again = "";
  }
});

app.post("/check",function(req,res){
  
  const obj = new Post({
    title : req.body.title,
    postbody : req.body.post
  });
  obj.save();
  // console.log(obj);
  res.redirect("/");
})
app.get("/delete/:para" , function(req,res){
  const nn = _.lowerCase(req.params.para);
  Post.deleteOne({title: nn}).then(()=>{
    console.log("deleted");
  })
  res.redirect("/");

})


app.listen(3000 ,  function() {
  console.log("Server started on port 3000");
});
