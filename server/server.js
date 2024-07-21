const express = require("express");
const fs = require("fs");
const multer = require('multer')
const cors = require("cors");
const app = express();
const port = 3000;
const router = require('./routes/router')

app.use(express.static('public'))
var storage = multer.diskStorage(
  {
      destination: './public/img/',
      filename: function ( req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);


const publicUpload = multer({storage: storage,})


const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));




// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());



app.post('/publicImgUpload', publicUpload.single('img'), (req, res) =>{
  const uploadedFile = req.file
  if(uploadedFile){
    
    const filePath = `./public/img/${uploadedFile.filename}`
    fs.writeFile(filePath, uploadedFile.buffer, (err)=>{
      if(err){
        console.log('>:(')
        res.status(500).send('>:(')
      }else{
        console.log('<:)', filePath, uploadedFile.filenameuploadedFile.filename)
        res.send('<:)')
      }
    })
  }
  
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
app.use(router);