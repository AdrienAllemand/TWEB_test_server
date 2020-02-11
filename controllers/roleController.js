'use strict';


var mongoose = require('mongoose'),
    roleController = mongoose.model('Roles');

exports.list_all_roles = function(req, res) {
    roleController.find({}, function(err, role) {
        if (err)
            res.send(err);
        res.json(role);
    });
};

exports.create_a_role = function(req, res) {
    var new_role = new roleController(req.body);
    new_role.save(function(err, role) {
        if (err)
            res.send(err);
        res.json(role);
    });
};


exports.read_a_role = function(req, res) {
    roleController.findById(req.params.roleId, function(err, role) {
        if (err)
            res.send(err);
        res.json(role);
    });
};


exports.update_a_role = function(req, res) {
    roleController.findOneAndUpdate({_id: req.params.roleId}, req.body, {new: true}, function(err, role) {
        if (err)
            res.send(err);
        res.json(role);
    });
};


exports.delete_a_role = function(req, res) {


    roleController.remove({
        _id: req.params.roleId
    }, function(err, role) {
        if (err)
            res.send(err);
        res.json({ message: 'roleController successfully deleted' });
    });
};

