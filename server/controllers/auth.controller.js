const fs = require('fs')


module.exports.register = async (req,res) =>{
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        let jsonData = JSON.parse(data) 
        if(req.body.password === req.body.confirm){
          const newUser = {
            status: 'on',
            class: 'admin',
            email: req.body.email,
            password: req.body.password
          }
          jsonData["pending"].push(newUser)
    
          fs.writeFile("users.json", JSON.stringify(jsonData), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              res.status(200).send(req.body)
            }
          });
        }else{
          res.status(500).send('le due password non corrispondono')
        }
    
        
        
      })
}

module.exports.login = async (req,res) =>{
    const income = req.body
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let jsonData = JSON.parse(data)
    let newEmail = income.email
    let newPassword  = income.password
    let token = new Date();
    jsonData['super'].forEach(account =>{
      if (account.email == newEmail && account.password == newPassword) {
        res.status(200).json({
          class: account.class,
          email: account.email,
          passrord: account.password
        })
      }
    })
    jsonData['admin'].forEach(account =>{
      if (account.email == newEmail && account.password == newPassword) {
        res.status(200).json({
          class: account.class,
          email: account.email,
          passrord: account.password
        })
      }
    })

    
  })
}