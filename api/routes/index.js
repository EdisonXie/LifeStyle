var express = require("express");
var request = require("request");
const fs = require("fs");
var path = require("path");
const { randomInt } = require("crypto");
var mime = require('mime-types')
var router = express.Router();

resolve = path.resolve;

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

// router.post("/checkout", function (req, res, next) {


module.exports = router;