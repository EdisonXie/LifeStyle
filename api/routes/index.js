var express = require("express");
var request = require("request");
const fs = require("fs");
var path = require("path");
const { randomInt } = require("crypto");
var mime = require('mime-types')
var router = express.Router();
resolve = path.resolve;

var app_id = "5006334e"
var app_key = "039d46d8d5d6d44baf7aac8f1ed3cb35"

var CloudmersiveBarcodeapiClient = require('cloudmersive-barcodeapi-client');
var defaultClient = CloudmersiveBarcodeapiClient.ApiClient.instance;

var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = "bee7aebf-526b-4839-b650-f687c86f69bf"
var apiInstance = new CloudmersiveBarcodeapiClient.BarcodeScanApi();


router.post("/sendbarcode", function (req, res, next) {
  // send img to barcode api
  var imageFile = req.files.image.tempFilePath;
  var fileExtension = mime.extension(req.files.image.mimetype) 

  var fullName = imageFile+"."+fileExtension;
  fs.renameSync(imageFile, fullName);

  var callback = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully. Returned data: ' + data);

      // get back UPC
      var barcodeType = data["BarcodeType"]
      var barcodeID = data["RawText"]

      // send UPC to food API, get back food data
      // var requestURL = "https://api.edamam.com/api/food-database/v2/parser?upc="+barcodeID+"&app_id="+app_id+"&app_key="+app_key;

      // request(requestURL, { json: true }, (err, res, body) => {
      //   if (err) { return console.log(err); }
      //   console.log(body.url);
      //   console.log(body.explanation);
      // });
      // parse api data

      //send back food data
      res.json(
        { "test":data }
      );
    }

  };
  
  var finalImage = Buffer.from(fs.readFileSync(fullName).buffer);
  apiInstance.barcodeScanImage(finalImage, callback);
});

router.get("/testinfo", function (req, res, next) {
  var requestURL = "https://api.edamam.com/api/food-database/v2/parser?upc="+"089125290008"+"&app_id="+app_id+"&app_key="+app_key;

  request(requestURL, { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);

    var foodInfo = {"label" : body.hints[0].food.label, "calories" : body.hints[0].food.nutrients.ENERC_KCAL, "saturatedFat" : body.hints[0].food.nutrients.FASAT,
                    "transFat" : body.hints[0].food.nutrients.FATRN, "sugar" : body.hints[0].food.nutrients.SUGAR, "protein" : body.hints[0].food.nutrients.PROCNT,
                    "carbs" : body.hints[0].food.nutrients.CHOCDF, "cholesterol" : body.hints[0].food.nutrients.CHOLE, "calcium" : body.hints[0].food.nutrients.CA}

    res.json(
      { "test":foodInfo }
    );
  });
})

module.exports = router;