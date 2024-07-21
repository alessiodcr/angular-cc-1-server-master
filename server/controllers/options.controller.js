const fs = require('fs')

module.exports.getOptions = async (req, res) =>{
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
}

module.exports.postOptions = async (req,res) =>{
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
}