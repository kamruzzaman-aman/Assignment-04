const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
app = express();

//Middleware
app.use(bodyParser.json());

// a.  Make a POST API with URL Query, Body & Header Properties.
app.post("/URLQuery", (req, res) => {
  let name = req.query.name;
  let roll = req.query.roll;
  res.send(`Name: ${name} and Roll: ${roll} `);
});

app.post("/JSONbody", (req, res) => {
  let jsonData = req.body;
  let jsonString = JSON.stringify(jsonData);
  res.send(jsonString);

//or direct data access
  // let n = jsonData['name'];
  // let r = jsonData['roll'];
  // let c = jsonData['class'];
  // res.send(n + " " + r + " " + c);
});

app.post("/formDataBody", multer().array(), (req, res) => {
  let formData = req.body;
  let jsonString = JSON.stringify(formData);
  res.send(jsonString);
});

app.post("/header", (req, res) => {
  let userName = req.header("userName");
  let password = req.header("password");
  res.send(userName + " " + password);
});


// b.  Make a file upload API support PNG,JPG file only

//storage Define
const imageStorage = multer.diskStorage({
    destination:'images',
    filename:(req, file, cb)=>{
        cb(null, file.originalname);
    },
})

//upload Middleware
const imageUpload = multer({
    storage: imageStorage,
    limits:{
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only .png and .jpg format allowed!"))
        }
    }
}).single('image')


//route
app.post("/uploadImage", (req, res) => {
  imageUpload(req, res, (error) => {
    if (error) {
        res.send({ error: error.message });
    } else if (req.file == undefined) {
      res.send("Please select a image!");
    } else {
      res.send(req.file.originalname + " is uploaded.");
    }
  });
});


// c. Make a file Download API, that can download file from application directory 
app.get("/download", (req, res)=>{
    res.download("./images/zaman.png");
})


//server listen
app.listen(5050, () => {
  console.log("Server Run Success");
});
