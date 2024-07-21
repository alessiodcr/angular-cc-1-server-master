const fs = require('fs')

module.exports.reject = async (req,res) =>{
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData = JSON.parse(data)
        jsonData['pending'] = jsonData['pending'].filter(user => JSON.stringify(user) != JSON.stringify(req.body.account) )
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

module.exports.accept = async (req, res) =>{
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData = JSON.parse(data)
        let newProfile = {}
        jsonData['pending'].forEach(account =>{
          if(account.email == req.body.email && account.password == req.body.password){
            newProfile = account 
          }
        })
        jsonData['pending'] = jsonData['pending'].filter(user => JSON.stringify(user) != JSON.stringify(req.body) )
        jsonData['admin'].push(newProfile)
    
    
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

module.exports.getPendings = async (req,res) =>{
    fs.readFile("users.json", "utf8", (err, data) =>{
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData =JSON.parse(data) 
        let users = jsonData['pending']
        res.status(200).json({
          users: users
        })
      })
}