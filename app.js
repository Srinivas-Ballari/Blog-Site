const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const lodash = require("lodash");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// connecting to the database:
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin_Srinivas:mongodb%402277@blogsite.dengxoo.mongodb.net/?retryWrites=true&w=majority");


// creating a schema for our model:
const mySchema = new mongoose.Schema({
    title:String,
    post:String
});

// creating a model and storing it in a new instance of a collection:
const MyCollection = new mongoose.model("MyCollection",mySchema);

// try using the MyCollection as the Schema name and insert every post detail's in the MyCollection schema .

const aboutCont = "-------------CLICK ON THE COMPOSE TAB , TO WRITE YOUR BLOG AND POST IT.--------------"+"-------------ENTER THE TITLE IN THE SEARCH BAR TO SEARCH FOR THE REQUIRED POST.------------------" +"-----------RANDOME TEXT STARTING HERE: text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.-------";


app.get("/",function(req,res){
    MyCollection.find({},function(err,foundItems){
        res.render("home.ejs",{allPosts:foundItems});
    });
    // res.render("home.ejs",{allPosts:allPosts});
});

app.get("/about",function(req,res){
    res.render("about.ejs",{rAbtCnt:aboutCont});
});

app.get("/compose",function(req,res){
    res.render("compose.ejs");
});

app.post("/compose",function(req,res){
    // extracting the title and post details:
    let currTitle = req.body.title;
    let currPost = req.body.post;

    // inserting the current post into the database:
    const insertIntoDb = async()=>{
        try{
            const currObj = new MyCollection({
                title: currTitle,
                post: currPost
            });
            const result = await currObj.save();
        }
        catch(err){
            console.log(err);
        }
    }
    insertIntoDb();

    res.redirect("/");
});

app.post("/home",function(req,res){

    var search = req.body.searchTitle;
    search = lodash.lowerCase(search);

    MyCollection.find({},function(err,foundItems){
        foundItems.forEach(function(obj){
            let title = obj.title;
            if(lodash.lowerCase(title) === search){
                res.render("post.ejs",{title : obj.title , post : obj.post});
            }
        });
    });

    res.render("error.ejs");

});


app.post("/error",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(req,res){
    console.log("server started at port 3000");
});