'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    username: {
        type: String,
        required: 'Username obligatoire',
        unique: true
    },
    password: {
        type: String,
        required: ' Mot de passe obligatoire'
    },
    apps:[{
        role  : {
            type: ObjectId,
            ref:'Roles',
            required:'L\'utilisateur doit avoir un role'
        },
        app  : {
            type: ObjectId,
            ref:'Apps',
            required:'L\'utilisateur doit avoir une app'
        }
    }]

});

module.exports = mongoose.model('Users', UserSchema);
