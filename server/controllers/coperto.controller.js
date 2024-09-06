const fs = require('fs')

module.exports.getCoperto = async (req,res) =>{
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
}

module.exports.postCoperto = async (req,res)=>{
  fs.readFile("coperto.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    jsonData.coperto  =req.body.coperto
    fs.writeFile("coperto.json", JSON.stringify(jsonData), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.status(200).send(req.body)
        }
      });
    
    });
}