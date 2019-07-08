import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import models from "../models/index";

const User = models.User

const verifyToken = (req, res, next)=> {
    const BearerToken = req.headers.authorization
    
    if (typeof(BearerToken) !== undefined){
    req.token = BearerToken.split(' ')[1] 
    next()
    }else{
        res.status(401).send({message: 'Forbidden access'});
    }
}

export const getTokenData =(req)=>{  
    let tokenData = {}
    jwt.verify(req.token, 'secret', (err, userData)=>{
        if(err){
            console.log(err);
            return;
        }
        tokenData = userData.user
    })
    return tokenData
}

export const validateContact =(req, res, next) =>{
   
    User.findAll({where:{id: req.body.reciever}})
    .then(user =>{
      if (user.length) {
        next();
      }
      else {
        res.send({message: 'Reciever contact Not found'})
        next();
    }
    })
    .catch(err => res.send(err))
}

export default verifyToken