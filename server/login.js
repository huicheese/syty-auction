var encode = require('hashCode').hashCode;
var utils = require('./utils.js');
var database = require('./database.js');

exports.setApp = app => {
    app.post('/login', (request, response) => {
        utils
            .checkAuth(request.cookies.sytyAuth)
            .then(isValidAuth => executeLogin(isValidAuth, request, response, app));
    });
};

let executeLogin = (isValidAuth, request, response, app) => {
    if (!isValidAuth) {
        if (!request.body)
            return response.status(400).send('Login form is empty')

        if (!request.body.firstName || !request.body.firstName.trim())
            return response.status(400).send('First name is empty')

        if (!request.body.lastName || !request.body.lastName.trim())
            return response.status(400).send('Last name is empty')

        if (!request.body.company || !request.body.company.trim())
            return response.status(400).send('Company is empty')

        if (!request.body.table || isNaN(request.body.table))
            return response.status(400).send('Table number is invalid')

        let userID =
            generateUserID(
                request.body.firstName,
                request.body.lastName,
                request.body.company,
                request.body.table);

        database
            .createUser(userID, request.body.firstName, request.body.lastName, request.body.company, request.body.table)
            .then(() => {
                let expiry = new Date(Date.now() + app.locals.cookiesExpiration);
                response.cookie('sytyAuth', userID, { expires: expiry });
                response.status(200).send('Login successful');
            })
            .catch(err => {
                console.error('Failed to login', err.stack);
                response.status(400).send('Failed to login');
            });
    }
    else {
        response.status(200).send('User already logged in')
    }
};

let generateUserID = (firstName, lastName, company, table) =>
    encode().value(JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        company: company,
        table: table
    }));