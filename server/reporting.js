var Promise = require('bluebird');
var database = require('./database.js');

exports.setApp = (app, wsInstance) => {
    app.get('/reporting/users', (request, response) => {
        database
            .getAllUsers()
            .then(users => response.status(200).send(JSON.stringify(users)))
            .catch(err => {
                console.error('Failed to query Users', err.stack);
                response.status(400).send('Failed to query Users');
            });
    })
};