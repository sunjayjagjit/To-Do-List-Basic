const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date());


const app = express();

let additems = ["Buy Playstation", "Do Homework", "Cook Dinner"];
let workItems = [];



//app that will generate using express ot ise 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    //req from date.js
    let day = date.getDate();

    //to render dolist.ejs passing two variables 1) kindOfDays and newListItem
    res.render("dolist", { kindOfDays: day, newListItem: additems });
});

//request the value from dolist.ejs
//searching the value called name"additem"
//to retrieve value input
app.post("/", function (req, res) {
    let item = req.body.addItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {

        additems.push(item)
        res.redirect("/");
    }



});

app.get("/work", function (req, res) {

    res.render("dolist", { kindOfDays: "Work List", newListItem: workItems })
})

app.post("/work", function (req, res) {
    let item = req.body.addItem
    workItems.push(item);
    res.redirect('/work')

})

app.get("/about", function (req, res) {
    res.render("about");
})
app.listen(3000, function () {
    console.log("Servere is running fine");
});

