 //jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true});
const Post = require('./views/models/Post.js');


const homeStartingContent = "Xin Chào! Heyy! I'm your soulmate! Tell me anything! I would be happy with you or sad with you! I won't give advice nor any comments! So don't worry! I'm all ears!";
const aboutContent = "Hi guys!! I am Truong Phu Vu. I created this website so you guys can save every moment during your days. It is really fun if we can read again what we wrote when we get older!!";
const contactContent = "You can check out more about me and the other projects that I did through:";

const app = express();
let postRoute = "";


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
  Post.find({}, (err, posts) => {
    res.render('home',{
      homeStartingContent: homeStartingContent,
      content: posts
    })
  })
})

app.get("/about", (req,res) => {
  res.render("about", {aboutContent: aboutContent});
})
app.get("/contact", (req,res) => {
  res.render("contact", {contactContent: contactContent});
})

app.get("/compose", (req,res) => {
  res.render("compose");
})


app.post("/compose", (req,res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.post,
    date: req.body.postDate
  })
  post.save(err => {
    if(!err){
      res.redirect('/');
    } else{
      console.log(err);
    }
  });
})


app.get("/posts/:postId", (req,res) =>{
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function (err, post){
    res.render('post', {
      title: post.title,
      content: post.content
    })
  })

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
