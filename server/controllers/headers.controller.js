const fs = require('fs')

module.exports.getHeaders = async (req, res) =>{
    fs.readFile("headers.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
    
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData)
        });
}

module.exports.postHeader = async (req,res) =>{
    fs.readFile("headers.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
    
        const jsonData = JSON.parse(data);
        jsonData[req.params.id] = req.body.header;
        fs.writeFile("headers.json", JSON.stringify(jsonData), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              res.status(200).send(req.body)
            }
          });
        
        });
}