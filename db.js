const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', (err, db) => {
    if(!err) {
        console.log("We are connected");
    } else {
        console.log(err);
    }
  });

const { Schema } = mongoose;

const userSchema = new Schema({ name: String , password: String});

const User = mongoose.model('User', userSchema);

function insertUser(name, password) {
    let newUser = new User({name, password});
    newUser.save().then(() => {
        console.log(`Database: new user ${name} added !`);
    })
};

function isUsernameUsed(name, callback) {
    return User.find()
            .where('name').equals(name)
            .exec(callback);
};
