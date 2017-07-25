var utils = require('./utils.js');
var database = require('./database.js');

exports.setApp = app => {
    app.post('/login', (request, response) => {
        utils
            .checkAuth(request.cookies.sytyAuth)
            .then(isValidAuth => executeLogin(isValidAuth, request, response, app.locals.cookiesExpiration));
    });
};

let executeLogin = (isValidAuth, request, response, cookiesExpiration) => {
    if (!isValidAuth) {
        let userInfo = utils.validateUserInfo(request.body);
        if (!userInfo.isValid) {
            response.status(400).send(userInfo.error);
            return;
        }

        database
            .createUser(userInfo.userID, userInfo.firstName, userInfo.lastName, userInfo.company, userInfo.table)
            .then(() => {
                let expiry = new Date(Date.now() + cookiesExpiration);
                response.cookie('sytyAuth', userInfo.userID, { expires: expiry });
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

