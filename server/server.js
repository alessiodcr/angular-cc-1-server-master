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
  fs.readFile("pages.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const pages = jsonData.pages
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
    let array;
    switch (req.params.id) {
      case 'antipasti':
        array = jsonData.items[0];
        break;
        case 'primi':
          array = jsonData.items[1];
          break;
          case 'secondi':
        array = jsonData.items[2];
        break;
        case 'pizzeria':
        array = jsonData.items[3];
        break;
        case 'birre':
        array = jsonData.items[4];
        break;
        case 'bibite':
        array = jsonData.items[5];
        break;
    }
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
