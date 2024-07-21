const fs = require('fs')

module.exports.getUsers = async (req, res) =>{
    fs.readFile("users.json", "utf8", (err, data) =>{
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData =JSON.parse(data) 
        let users = jsonData['admin']
        res.status(200).json({
          users: users
        })
      })
}

module.exports.deleteUser = async (req,res) =>{
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData = JSON.parse(data)
        jsonData['admin'] = jsonData['admin'].filter(user => JSON.stringify(user) != JSON.stringify(req.body.account) )
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