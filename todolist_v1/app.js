const express= require("express");
const bodyparser= require("body-parser");
const date=require(__dirname+"/date.js");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine" , "ejs");
app.use(express.static(__dirname+"/public"));
var tasks=[];
var assignmentsList=[];

app.get("/", function(req,res){
   
    var day=date.getdate();

    res.render('list', {list:day, newtask:tasks});
});

app.get("/assignments", function(req,res){
    res.render('list', {list:"Assignments", newtask:assignmentsList });
});

app.post("/", function(req,res){
    console.log(req.body);
    var newitem= req.body.newtask;

    if(req.body.button === "Assignments")
    {
        assignmentsList.push(newitem);
        res.redirect("/assignments");
    }
    else{
        tasks.push(newitem);
    res.redirect("/");
    }
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});