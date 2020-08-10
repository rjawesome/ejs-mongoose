"use strict";
exports.__esModule = true;
var express_1 = require("express");
var models_1 = require("./models");
var app = express_1["default"]();
app.use(express_1["default"].urlencoded());
app.use(express_1["default"].static('static'));
app.set('view engine', 'ejs');
app.get("/", function (req, res) {
    models_1.stuffs.find(function (err, stuffs) {
        res.render('index', { stuffs: stuffs });
    });
});
app.get("/add", function (req, res) {
    res.render('add');
});
app.post('/add', function (req, res) {
    if (req.body.title === "" || req.body.description === "" || !req.body.title || !req.body.description) {
        res.redirect("/add");
        return;
    }
    else {
        models_1.stuffs.create({ title: req.body.title, description: req.body.description }, function (err) {
            if (err)
                res.send("Error Occured");
            else
                res.redirect("/");
        });
    }
});
app.get("/edit/:id", function (req, res) {
    models_1.stuffs.findById(req.params.id, function (err, stuff) {
        if (err)
            res.send("Error Occured");
        else
            res.render('edit', { stuff: stuff });
    });
});
app.post("/edit/:id", function (req, res) {
    models_1.stuffs.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description }, function (err) {
        if (err)
            res.send("Error Occured");
        else
            res.redirect("/");
    });
});
app.post("/delete/:id", function (req, res) {
    models_1.stuffs.deleteOne({ _id: req.params.id }, function (err) {
        if (err)
            res.send("Error Occured");
        else
            res.redirect("/");
    });
});
app.listen(3000);
