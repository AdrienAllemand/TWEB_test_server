
let port = process.env.PORT || 3000;
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let cors = require('cors');
var createError = require('http-errors');




let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/userprovider', { useNewUrlParser: true,  useCreateIndex: true,},(err,database)=>{
});
const passport = require('passport');
require('./config/passport');

let express = require('express');
let app = express();
app.use(passport.initialize());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

let Role = require('./models/roleModel');
let App = require('./models/appModel');
let User = require('./models/userModel');
var userRouter = require('./routes/userRouter'); //importing route
var appRouter = require('./routes/appRouter'); //importing route
var roleRouter = require('./routes/roleRouter'); //importing route
var authRouter = require('./routes/authRouter'); //importing route
app.use(cors());

let middleware = require('./middleware/middleware');

authRouter(app);
app.use(middleware.checkToken);
userRouter(app);
appRouter(app);
roleRouter(app);

app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.header('content-Type','json/application');
    res.status(err.status || 500).json({
        error:true,
        message: 'Route not found'
    });
     next();
});

app.listen(port);
console.log('Server started on: ' + port);
