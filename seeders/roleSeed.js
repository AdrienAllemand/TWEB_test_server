
var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/otrain', function() {

    // Load Mongoose models
    seeder.loadModels([
        '../models/roleModel.js',
    ]);

    // Clear specified collections
    seeder.clearModels(['roles', 'Model2'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function() {
            seeder.disconnect();
        });

    });
});

// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Model1',
        'documents': [
            {
                'name': 'Doc1',
                'value': 200
            },
            {
                'name': 'Doc2',
                'value': 400
            }
        ]
    }
];