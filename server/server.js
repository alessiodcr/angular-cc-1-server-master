const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

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

  fs.readFile("n.json", "utf8", (err, data) => {
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
    fs.readFile("n.json", "utf8", (err, data) => {
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
    fs.readFile("n.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      const jsonData = JSON.parse(data)
      jsonData[req.params.id].splice(jsonData[req.params.id].indexOf(req.body), 1);

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
