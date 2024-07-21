const fs = require('fs')

module.exports.postPage = async (req, res) =>{
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
}


module.exports.deletePage = async (req,res) =>{
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
      
}

module.exports.getPages = async (req,res) =>{
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
}