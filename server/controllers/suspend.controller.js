const fs  = require('fs')

module.exports.suspend = async (req,res) =>{
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData = JSON.parse(data)
        jsonData[req.body.class].map(account=>{
          if(JSON.stringify(account) == JSON.stringify(req.body)){
            account.status = 'suspended'
          }
        })
        fs.writeFile("users.json", JSON.stringify(jsonData), (err) => {
          if (err)
            console.log(err);
          else {
            console.log("File written successfully\n");
            res.status(200).send(req.body)
          }
        });
        
      })
}

module.exports.riabilita = async (req,res) =>{
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData = JSON.parse(data)
        jsonData[req.body.class].map(account=>{
          if(JSON.stringify(account) == JSON.stringify(req.body)){
            account.status = 'on'
          }
        })
        fs.writeFile("users.json", JSON.stringify(jsonData), (err) => {
          if (err)
            console.log(err);
          else {
            console.log("File written successfully\n");
            res.status(200).send(req.body)
          }
        });
        
      })
}