var database = require('./database.js');

module.exports = {

    isValidAuth: function(authCookie) {
        if (!authCookie)
            return false;

        database
            .getUser(authCookie)
            .then(user => return typeof user !== undefined)
            .catch(err => {
                console.error('Failed to check User ' + authCookie, err.stack);
                return false;
            })
    }
};

function tryParseJSON(jsonString){
    try {
        let json = JSON.parse(jsonString);
        if (json && typeof json === "object")
            return json;
    }
    catch (e) { }
    return false;
};