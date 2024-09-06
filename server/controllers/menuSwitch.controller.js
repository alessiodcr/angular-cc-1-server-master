const { json } = require('express');
const fs = require('fs')

module.exports.isOn = async (req,res)=>{
    fs.readFile("menu.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
    
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData)
        });
}

module.exports.switch = async (req,res)=>{
    fs.readFile("menu.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
    
        const jsonData = JSON.parse(data);
        jsonData.menu = !jsonData.menu
        fs.writeFile("menu.json", JSON.stringify(jsonData), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              res.status(200).send(req.body)
            }
          });
        
        });
}