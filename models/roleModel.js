'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var roleSchema = new Schema({
    name: {
        type: String,
        required: 'Nom obligatoire'
    }
});

module.exports = mongoose.model('Roles', roleSchema);
