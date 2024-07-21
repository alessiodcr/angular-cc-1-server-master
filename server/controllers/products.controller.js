const fs = require('fs')
const replaceProduct = (array, toReplace, product) =>{
  let newArray = []
  array.forEach(x =>{
      if(x.nome == toReplace.nome ){
          x = product
          newArray.push(x)
      }else{
          newArray.push(x)
      }
  })
  return newArray
}
module.exports.getProducts = async (req,res) =>{
    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        const jsonData = JSON.parse(data);
        const array = jsonData[req.params.id] 
        console.log('fatto')
        res.status(200).json({
          items: array,
        });
        });
}



module.exports.postProducts = async (req, res) =>{
    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log('ciao\n\n\nn\nn\n\n\n')
      const jsonData = JSON.parse(data)
      jsonData[req.params.id].push(req.body);
      fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.status(200).json(req.body)
        }
      });
      
    })
    
}


module.exports.deleteProducts = async (req, res) =>{
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let jsonData = JSON.parse(data)
    jsonData[req.params.id] = jsonData[req.params.id].filter(product => product.nome != req.body.nome)
    if(fs.existsSync(`../public/img/${req.body.img.slice(26)
    }`)){
      fs.unlink(`../public/img/${req.body.img.slice(26)}`, (err)=>{
        if(err){
          console.log(err)
        }
      })
    }
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


module.exports.editProducts = async ( req, res) =>{
    fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      let jsonData = JSON.parse(data)
      
      jsonData[req.params.id] = replaceProduct(jsonData[req.params.id], req.body.prev, req.body.new)
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