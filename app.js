const server = require('express');

let db = require('db');

server.get('/', (req, res, next) => {
    console.log('Server: accessing /');
});

