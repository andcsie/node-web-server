const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();
const port =   process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
//register middleware

app.use((req,res,next)=>{
    //next() - signal the callback is finished 
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to write to the file!");
        }
    });
    next();
});

// app.use((req, resp, next) => {
//     resp.render("maintenance.hbs");
//     next();
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (input) =>{
    return input.toUpperCase();
});

app.get("/", (request, response) =>{
    response.render("home.hbs",{
       pageTitle : "Home",
       welcomeMessage : "Welcome home"
    });
});

app.get("/about", (request, response) => {
    response.render("about.hbs", {
        pageTitle : "About"
    });
});


app.get("/bad", (request, response) => {
    response.send({
        errorMessage : "Unable to retrieve data!"
    });
});

app.get("/projects", (request, response) => {
    response.render("projects.hbs", {
        pageTitle : "Projects"
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
