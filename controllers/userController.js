'use strict';


var mongoose = require('mongoose');
let UserController = mongoose.model('Users');
let rolesController = mongoose.model('Roles');

exports.list_all_users = function(req, res) {
    UserController.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).populate({
        path:'roles',
        select:'name-_id'
    }).populate({
        path: 'apps',
        select: 'name -_id'
    });
};

exports.list_all_complementaryRoles = (req,res) => {
    const userId= req.body._id;
    const appId = req.body.appId;
    UserController.findOne({ _id: userId},'roles', function(err, userRoles) {
        rolesController.find({$or:  userRoles.roles}, (err,roles) => {
            if (err)
                res.send(err);
            res.json(roles);

        });
    }).populate({
        path:'roles',
        select:'name-_id'
    });
};




exports.create_a_user = function(req, res) {
    var new_user = new UserController(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
exports.create_a_user_for_app = function(req, res) {
    const {

    } = req.body;
    var new_user = new UserController(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.read_a_user = function(req, res) {
    UserController.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.update_a_user = function(req, res) {
    UserController.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_a_user = function(req, res) {


    UserController.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'UserController successfully deleted' });
    });
};
