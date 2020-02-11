'use strict';
let hasRole = require('../middleware/middleware').hasRole;
let hasAcces = require('../middleware/middleware').hasAcces;

module.exports = function(app) {
    var appController = require('../controllers/appController.js');

    // app Routes
    app.route('/app')
        .get(hasRole(['USER']),appController.list_apps_user)
        .post(hasRole(['USER']),appController.create_a_app);


    app.route('/app/:appId')
        .get(hasRole(['USER']),hasAcces(),appController.read_a_app)
        .put(hasRole(['USER']),hasAcces(),appController.update_a_app)
        .delete(hasRole(['USER']),hasAcces(),appController.delete_a_app);

     app.route('/app/:appId/role/complementary')
            .get(hasRole(['USER']),hasAcces(),appController.read_complementary_roles)
};
