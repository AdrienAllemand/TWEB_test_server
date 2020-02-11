'use strict';
module.exports = function(app) {
    var auth = require('../controllers/authController.js');

    // role Routes
    app.route('/auth/login')
        .post(auth.login);

    app.route('/auth/register')
        .post(auth.register);
};
