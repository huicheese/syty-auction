var utils = require('./utils.js');
var database = require('./database.js');

exports.setApp = app => {
    app.post('/login', (request, response) => {
        utils
            .checkAuth(request.cookies.sytyAuth)
            .then(authValidationResult =>
                    executeLogin(
                        authValidationResult,
                        request.body,
                        response,
                        process.env.COOKIES_EXPIRATION || app.locals.cookiesExpiration));
    });

    app.get('/logout', (request, response) => {
        response.clearCookie('sytyAuth');
        response.status(200).send('Logout successful');
    })
};

let executeLogin = (authValidationResult, userInfo, response, cookiesExpiration) => {
    if (!authValidationResult.isValid) {
        let userInfoValidationResult = utils.validateUserInfo(userInfo);
        if (!userInfoValidationResult.isValid) {
            response.status(400).send(userInfoValidationResult.error);
            return;
        }

        utils
            .createUserIfRequired(userInfoValidationResult)
            .then(userCreationResult => {
                console.log('Login result for User', userCreationResult);
                if (userCreationResult.isValid) {
                    let expiry = new Date(Date.now() + cookiesExpiration);
                    response.cookie('sytyAuth', userCreationResult.userID, { expires: expiry });
                    response.status(200).send(userCreationResult.userID);
                } else {
                    response.status(400).send('Failed to login');
                }
            });
    }
    else {
        response.status(200).send('User already logged in')
    }
};

