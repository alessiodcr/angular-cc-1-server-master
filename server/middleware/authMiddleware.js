const jwt = require('jsonwebtoken')
const {env} = require('../env/env') 

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, env.authSecret, (err, decodedToken) =>{
            if(err){
                res.send('User not logged in');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.send('User not logged in');
    }

    
}


const requireSuperAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, env.authSecret, (err, decodedToken) =>{
            if(err || decodedToken.payload.class != 'super'){
                res.send('User not logged in');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.send('User not logged in');
    }
}
module.exports = { requireAuth, requireSuperAuth}