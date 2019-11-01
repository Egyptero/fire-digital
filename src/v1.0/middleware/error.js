const winston = require('winston');

module.exports = (err,req,res,next)=>{
    if(err){
        winston.error(`System error ${err}`);
        return res.status(500).send('Internal Server Error');
    } else
        next();
}