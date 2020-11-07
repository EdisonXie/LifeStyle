var express = require("express");
var request = require("request");
const fs = require("fs");
var path = require("path");
const { randomInt } = require("crypto");
var router = express.Router();


router.get("/sendbarcode/:imgBase64", function (req, res, next) {
    // res.send(req.params);
    // res.send(user1.id);

    // send img to barcode api

    // get back UPC

    // send UPC to food API, get back food data

    // parse api data

    //send back food data
    res.json(
      { "test":"hi_"+req.params.imgBase64 }
    );
});

// router.post("/checkout", function (req, res, next) {


module.exports = router;