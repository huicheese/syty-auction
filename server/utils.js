var Promise = require('bluebird');
var crypto = require('crypto');
var encode = require('hashCode').hashCode;
var database = require('./database.js');

let uuid = () => randomHex() + '-' + randomHex() + '-' + randomHex() + '-' + randomHex();
let randomHex = () => crypto.randomBytes(4).toString('hex');

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

let validateUserInfo = userInfo => {
	let content = {
        firstName: (userInfo && userInfo.firstName) || "",
        lastName: (userInfo && userInfo.lastName) || "",
        company: (userInfo && userInfo.company) || "",
        table: (userInfo && userInfo.table) || "",
    };

    let error; 
    if (!content.firstName)
        error = 'First name is empty';
    else if (!content.lastName)
        error = 'Last name is empty';
    else if (!content.company)
        error = 'Company is empty';
    else if (isNaN(content.table))
        error = 'Table number is invalid';

    content.error = error;
    content.isValid = typeof error === 'undefined';

    if (content.isValid)
    	generateUserID(content);
    return content;
}

let generateUserID = (userInfo) => {
    let userID =
    	encode().value(JSON.stringify({
        	firstName: userInfo.firstName,
	        lastName: userInfo.lastName,
	        company: userInfo.company,
	        table: userInfo.table
	    })).toString();
    userInfo.userID = userID;
}

module.exports = {
    uuid: uuid,
    checkAuth: checkAuth,
    validateUserInfo: validateUserInfo
};