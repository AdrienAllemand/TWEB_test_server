exports.module= ()=>{
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    userModel = mongoose.model('Users');
    roleModel = mongoose.model('Roles');
    appModel = mongoose.model('Apps');

    roleModel.finfAll({}).then((roles)=>{
        console.log(roles)
    });

    var users = new userModel({
        username:'dpage',
        password:bcrypt.hashSync('root', 8),


    });
}


