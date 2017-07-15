var Promise = require('bluebird');
var database = require('./database.js');

let checkAuth = authCookie =>
    Promise.resolve(typeof authCookie !== 'undefined' && verifyIfUserExists(authCookie));

let verifyIfUserExists = authCookie =>
    database
        .getUser(authCookie)
        .then(user => typeof user !== 'undefined')
        .catch(err => {
            console.error('Failed to check User ' + authCookie, err.stack);
            return false;
        });

module.exports = {
    checkAuth: checkAuth
};