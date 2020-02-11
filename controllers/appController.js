'use strict';


var mongoose = require('mongoose');
let appModel = mongoose.model('Apps');
let userModel = mongoose.model('Users');
let roleModel = mongoose.model('Roles');

exports.list_apps_user = function(req, res) {

    userModel.findOne({
        username:req.decoded.username,
    }).populate({
        path:'apps.app',
        populate: {path: 'roles'},
    }).populate({
        path: 'apps.role',
        match: { name: 'ADMIN' },
    }).exec((err,user)=>{
        if (err)
            res.send(err);
        let result = [];
        user.apps.forEach((obj)=>{
            if(obj.role != null && obj.app != null){
                result.push(obj.app);
            }
        });
        res.send(result);
    });
};



//HACK: A optimiser
exports.create_a_app = function(req, res) {
    const username= req.decoded.username;
    userModel.findOne({username:username}, (err,user)=>{
        roleModel.findOne({name:'ADMIN'},(err,role)=>{
            var new_app = new appModel(req.body);
            new_app.roles.push(role);
            new_app.users.push(user);
            new_app.save((err,app)=>{
                if (err)
                    res.send(err);
                user.apps.push({role:role._id,app:new_app._id});
                user.save((err,data)=>{
                    if (err)
                        res.send(err);
                    res.json({ message: 'app crée' });

                });
            });
        });
    });
};

exports.read_a_app = function(req, res) {
    appModel.findById(req.params.appId, function(err, app) {
        if (err)
            res.send(err);
        res.json(app);
    });
};


exports.update_a_app = function(req, res) {
    appModel.findOneAndUpdate({_id: req.params.appId}, req.body, {new: true}, function(err, app) {
        if (err)
            res.send(err);
        res.json(app);
    });
};
exports.read_complementary_roles = (req,res) => {
};
exports.delete_a_app = function(req, res) {
    userModel.findOne({
        username:req.decoded.username,
    }).populate('apps.app').exec((err,user)=>{
        if (err)
            res.send(err);
        let index = user.apps.findIndex(obj => obj.app._id.equals(req.params.appId));
        if(index !== -1){
            user.apps.splice(index,1);
            user.save((err,user2)=>{
                appModel.remove({
                    _id: req.params.appId
                }, function(err, app) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'appController successfully deleted' });
                });
            });
        }
    });
};
