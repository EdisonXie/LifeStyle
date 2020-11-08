var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var fileupload = require("express-fileupload");
const port = 3000

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : 'tmp/'
}));

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
// module.exports = app;