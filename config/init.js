let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/otrain', { useNewUrlParser: true },(err,database)=>{
    db  = database;
    db.collection('Roles').insert([{
        name:'ADMIN'
    },{name:'USER'}]).then((role)=>{
        console.log(role)
    });
});