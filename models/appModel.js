'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;



var appSchema = new Schema({
    name: {
        type: String,
        required: 'Nom obligatoire',
        unique:true
    },
    url: {
        type: String,
        required: 'url obligatoire',
        unique:true
    },
    roles: [{
        type: ObjectId,
        ref:'Roles',
    }],
    users:[{
        type: ObjectId,
        ref:'Users',
        required:'L\'utilisateur doit avoir une app'
    }]
});

module.exports = mongoose.model('Apps', appSchema);
