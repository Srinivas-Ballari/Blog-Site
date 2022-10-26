const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodashobj = require("lodash");
app.set('search engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const homeContent = "ransfodf sidubf ssiudhf  sdbf b fsd fisydbfdhbfhdhfi  sdf.";
const aboutContent = "this is the about content ..asjns dsiduf sd dfjs dfs ";
const contactContent = "this is the contact content .. sdufh sn dhadjasdbfhad a";


var allPosts = [];

app.get("/",function(req,res){
    res.render("home.ejs",{receiveHC:homeContent, receiveAllPosts:allPosts});
});

app.get("/about",function(req,res){
    res.render("about.ejs",{receiveAC:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact.ejs",{receiveCC:contactContent});
})

app.get("/compose",function(req,res){
    res.render("compose.ejs");
});

app.get("/posts/:topic",function(req,res){
    let searchTopic = req.params.topic;
    searchTopic = lodashobj.lowerCase(searchTopic);

    allPosts.forEach(function(obj){
        if(lodashobj.lowerCase(obj.postTitle) === searchTopic){
            res.render("post.ejs",{receiveTitle:obj.postTitle , receiveText:obj.postText});
        }
    });
}); 

app.post("/compose",function(req,res){
    var postObj = {
        postTitle : req.body.titleInput,
        postText : req.body.postInput
    };
    allPosts.push(postObj);
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server has started");
});
