'use strict';

let passport = require('passport');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
var secret    = require(__dirname + '/../config/config.json')['secret'];
var tokenValideDuration    = require(__dirname + '/../config/config.json')['tokenValideDuration'];

var mongoose = require('mongoose');
let userModel = mongoose.model('Users');
let roleModel = mongoose.model('Roles');
let appModel = mongoose.model('Apps');

exports.login = (req,res)=>{
    passport.authenticate('local', {session: false}, (err, user, info) => {

        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            user.set('password');
            let index = user.apps.findIndex(obj => obj.app.url === req.hostname);
            if(index !== -1) {
                const token = jwt.sign({username:user.username,appId:user.apps[index].app._id,role:user.apps[index].role.name},secret,{ expiresIn: tokenValideDuration });
                return res.status(201).json({token,user,error:false})
            }
        });
    })
    (req, res);
};
function test(element,url){

    return element.app.url===url;

}

exports.register = (req,res)=>{
    const {
        username,
        password,
    } = req.body;
    let hashedPassword = bcrypt.hashSync(password, 8);
    roleModel.findOne({name:'USER'}, (err,role)=>{
        appModel.findOne({url:req.hostname}, (err,app)=>{
            let newUser = userModel({
                username:username,
                password:hashedPassword,
                apps:{
                    app:app._id,
                    role:role._id
                }
            });
            console.log(newUser);
            newUser.save((err, user)=>{
                if (err)
                    res.send(err);
                app.users.push(user._id);
                app.save((err, app) =>{
                    if (err)
                        res.send(err);
                    res.status(200).json("ok");
                })
            });
        });
     });
};
