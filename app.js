const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const lodash = require("lodash");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const aboutCont = "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var allPosts = [];

app.get("/",function(req,res){
    res.render("home.ejs",{allPosts:allPosts});
});

app.get("/about",function(req,res){
    res.render("about.ejs",{rAbtCnt:aboutCont});
});

app.get("/compose",function(req,res){
    res.render("compose.ejs");
});

app.post("/compose",function(req,res){
    var postObj = {
        title : req.body.title,
        post : req.body.post
    };
    allPosts.push(postObj);
    res.redirect("/");
});

app.post("/home",function(req,res){
    var search = req.body.searchTitle;
    search = lodash.lowerCase(search);
    let flagCnt = 0;
    allPosts.forEach(function(obj){
        let title = obj.title;
        if(lodash.lowerCase(title) === search){
            res.render("post.ejs",{title : obj.title , post : obj.post});
        }else{
            flagCnt++;
        }
    });
    if(flagCnt == allPosts.length){
        res.render("error.ejs");
    }
});


app.post("/error",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(req,res){
    console.log("server started at port 3000");
});