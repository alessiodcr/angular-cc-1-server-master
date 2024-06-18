const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;
const replaceProduct = (array, toReplace, product) =>{
  let newArray = []
  array.forEach(x =>{
      if(x.nome == toReplace.nome ){
          x = product
          newArray.push(x)
      }else{
          newArray.push(x)
      }
  })
  return newArray
}
// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));




// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());





app.get('/options', (req, res) =>{
  fs.readFile("options.json", "utf8", (err, data) =>{
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let jsonData =JSON.parse(data) 
    let options = jsonData.options
    console.log(options)
    res.status(200).json(options)
  })
})





app.post('/options', (req, res)=>{
  fs.readFile("options.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let jsonData = JSON.parse(data)
    jsonData["options"] = req.body

    fs.writeFile("options.json", JSON.stringify(jsonData), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        res.status(200).send(req.body)
      }
    });
    
  })
})





app.post('/login', (req, res) =>{
  const income = req.body
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let jsonData = JSON.parse(data)
    let email = jsonData.super.email
    let password = jsonData.super.password
    let newEmail = income.email
    let newPassword  = income.password
    let token = new Date();
    if(email == newEmail && password == newPassword){
      res.status(200).json({
        email: email,
        passrord: password
      })
    }
  })
})




app.delete('/pages', (req, res) =>{
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let jsonData = JSON.parse(data)
    jsonData = Object.keys(jsonData).filter(objKey =>
      objKey !== req.body.name).reduce((newObj, key) =>
      {
          newObj[key] = jsonData[key];
          return newObj;
      }, {}
  );

    fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        res.status(200).send(req.body)
      }
    });
    
  })
  
})





app.post('/pages', (req,res) =>{
  console.log(req.body)
    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      const jsonData = JSON.parse(data)
      jsonData[req.body.name] = []

      fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.status(200).send('cancellato')
        }
      });
      
    })
})






app.get("/pages", (req, res) =>{
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const pages = Object.keys(jsonData)
    res.status(200).json({
      pages: pages
    })
    });
  
} )





// GET route - Allows to get all the items
// il pacchetto json è diviso in 7 array uno per ogni portata ogni pagina ha 5 elementi inviati in base all id che rappresenta la pagina
app.get("/:id", (req, res) => {

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const jsonData = JSON.parse(data);
    const array = jsonData[req.params.id] 
    console.log('fatto')
    //console.log(array)
    //console.log("done")
    // in questo modo verra inviato un array in base alla pagina
    res.status(200).json({
      items: array,
    });
    });
  });






  app.get("/coperto", (req, res) =>{
    fs.readFile("coperto.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      const jsonData = JSON.parse(data);
      const coperto = jsonData.coperto
      console.log(coperto)
      res.status(200).json({
        coperto: coperto
      })
      });
    
  } )





  app.post("/:id", (req,res) =>{
    console.log(req.body)
    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      const jsonData = JSON.parse(data)
      console.log(req.params.id )
      jsonData[req.params.id].push(req.body);

      fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.status(200).send('cancellato')
        }
      });
      
    })
    
  })




  app.delete('/:id', (req, res) =>{
    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      let jsonData = JSON.parse(data)
      jsonData[req.params.id] = jsonData[req.params.id].filter(product => product.nome != req.body.nome)
      fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.status(200).send(req.body)
        }
      });
      
    })
    
  })





  app.put('/:id', (req,res)=>{
    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      let jsonData = JSON.parse(data)
      
      jsonData[req.params.id] = replaceProduct(jsonData[req.params.id], req.body.prev, req.body.new)
      fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.status(200).send('cancellato')
        }
      });
      
    })
  })





  
// POST route - Allows to add a new item
// example: localhost:3000/clothes
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
