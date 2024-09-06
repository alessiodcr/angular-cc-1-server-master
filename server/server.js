const express = require("express");
const fs = require("fs");
const multer = require('multer')
const cors = require("cors");
const app = express();
const port = 3000;
const router = require('./routes/router')
const cookieParser = require('cookie-parser')
app.use(express.static('public'))
app.use(cookieParser())
var storage = multer.diskStorage(
  {
      destination: './public/img/',
      filename: function ( req, file, cb ) {
        
        if(((file.originalname.slice(0, file.originalname.indexOf('.'))) == 'Logo') || ((file.originalname.slice(0, file.originalname.indexOf('.'))) == 'cereali')  || ((file.originalname.slice(0, file.originalname.indexOf('.'))) == 'crostacei') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'uova') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'pesce') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'arachidi') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'soia') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'latte') || ((file.originalname.slice(0, file.originalname.indexOf('.')) == 'fruttaAGuscio') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'sedano') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'senape') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'sesamo') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'Asolforica') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'lupini') || ((file.originalname.slice(0, file.originalname.indexOf('.'))) == 'molluschi') || ((file.originalname.slice(0, file.originalname.indexOf('.') )) == 'funghi'))){
          cb(null, (file.originalname.slice(0, file.originalname.indexOf('.')) + '.png'))
        }else{
          cb( null, file.originalname);
        }
      }
  }
);


const publicUpload = multer({storage: storage,})


const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
  credentials: true
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