'use strict';
let hasRole = require('../middleware/middleware').hasRole;
module.exports = function(app) {
    var role = require('../controllers/roleController.js');

    // role Routes
    app.route('/role')
        .get(role.list_all_roles)
        .post(role.create_a_role);
    app.route('/role/:roleId')
        .get(role.read_a_role)
        .put(role.update_a_role)
        .delete(role.delete_a_role);
};
