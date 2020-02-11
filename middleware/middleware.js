let jwt = require('jsonwebtoken');
var env       = process.env.NODE_ENV || 'dev';
var secret    = require(__dirname + '/../config/config.json')['secret'];
var mongoose = require('mongoose');
let appModel = mongoose.model('Apps');
let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        appModel.findOne({url:req.hostname}).then((data)=>{
            jwt.verify(token, secret, (err, decoded) => {
                if (err || !data) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        });

    }
    else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
let hasRole=(roles)=>{
    return (req, res, next) =>{
        if(roles.indexOf(req.decoded.role)!==-1){
            next();
        }
        else{
            return res.status(403).json({
                error:false,
                message: 'unauthorized'
            });
        }
    }
};
let hasAcces=()=>{
    return (req, res, next) =>{
        next();
    }
};
module.exports = {
    checkToken: checkToken,
    hasRole: hasRole,
    hasAcces: hasAcces
};
