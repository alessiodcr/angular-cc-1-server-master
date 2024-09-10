const fs = require('fs')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {env} = require('../env/env')
const maxAge = 7 * 24 * 60 * 60 ;
async function hashPassword(password){
  const salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword;
}
const createToken = (payload) =>{
  return jwt.sign({payload}, env.authSecret, {
    expiresIn: maxAge
  })
}

module.exports.register = async (req,res) =>{
    fs.readFile("users.json", "utf8", async (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('internal server error')
          return;
        }
        let jsonData = JSON.parse(data) 
        let keys = Object.keys(jsonData);
        let accountExists = false;
        keys.forEach(key =>{
          jsonData[key].forEach(account =>{
            console.log(account)
            if( account.email == req.body.email || account.nome == req.body.nome){
              accountExists = true
            }
          })
        })
        if(accountExists){
          console.log('yes')
          res.send({message:'credenziali gia in utilizzo'}).status(400)
          return;
        }
        if(req.body.password === req.body.confirm){
          const date = new Date()
          const password = await hashPassword(req.body.password)
          const newUser = {
            status: 'on',
            class: 'admin',
            nome: req.body.nome,
            email: req.body.email,
            password: password,
            date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
          }
          jsonData["pending"].push(newUser)
    
          fs.writeFile("users.json", JSON.stringify(jsonData), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              res.status(200).json(newUser)
            }
          });
        }else{
          res.status(400).send({message:'le due password non corrispondono'})
          return;
        }
        
    
        
        
      })
}

module.exports.login = async (req,res) =>{
    const income = req.body
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("errore interno al server, riprova");
      return;
    }
    let jsonData = JSON.parse(data)
    let newEmail = income.email
    let newPassword  = income.password
    jsonData['super'].forEach(async (account) =>{
      let passwordCompared = await bcrypt.compare(newPassword, account.password);
      console.log(passwordCompared);
      if (account.email == newEmail && passwordCompared && account.status == 'on') {
        const token =  createToken({
          class: account.class,
          nome: account.nome
        });
        res.cookie('jwt', token, {httpOnly: false, maxAge: maxAge * 1000}).status(200).json({
          nome: account.nome,
          status: account.status,
          class: account.class,
          email: account.email
        })
      }
    })
    jsonData['admin'].forEach(async (account) =>{
      let passwordCompared = await bcrypt.compare(newPassword, account.password);
      console.log(passwordCompared);
      if (account.email == newEmail && passwordCompared && account.status == 'on') {
        const token =  createToken({
          class: account.class,
          nome: account.nome
        });
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}).status(200).json({
          nome: account.nome,
          status: account.status,
          class: account.class,
          email: account.email
        })
      }
    })

    
  })
}