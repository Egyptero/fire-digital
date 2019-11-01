const winston = require('winston');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next)=>{
    if(!req.header('x-auth-token')) return res.status(401).send('Access denid. No token provided ');
    try{
        const decoded = jwt.verify(req.header('x-auth-token'),config.get('jwtPrivateKey'));
        req.user = decoded;
    }catch(ex){
        return res.status(400).send('Invalid token');
    }
    next();
}