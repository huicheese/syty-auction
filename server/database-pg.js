var path = require('path');
var Promise = require('bluebird');

var options = {
  promiseLib: Promise
};

var pgp = require('pg-promise')(options);
var db = pgp(process.env.DATABASE_URL || 'postgres://postgres:bibobeo@localhost:5432/tikam');

let sql = (file) => {
    const fullPath = path.join(__dirname, '/sql/', file);
    return new pgp.QueryFile(fullPath, {minify: true});
}

let sqlCreateTableUsers = sql('user/createTableUsers.sql');
let sqlGetUser = sql('user/getUser.sql');
let sqlGetAllUsers = sql('user/getAllUsers.sql');
let sqlCreateUser = sql('user/createUser.sql');
let sqlDeleteAllUsers = sql('user/nukeUsers.sql');

let sqlCreateTableBiddings = sql('bidding/createTableBiddings.sql');
let sqlGetRecentBiddings = sql('bidding/getRecentBiddings.sql');
let sqlSubmitBid = sql('bidding/submitBid.sql');
let sqlDeleteAllBiddings = sql('bidding/nukeBiddings.sql');

let sqlGetSlotInfo = sql('summary/getSlotInfo.sql');
let sqlGetAllSlotsInfo = sql('summary/getAllSlotsInfo.sql');

exports.initialize = () =>
	Promise
		.resolve()
		.then(() => console.log("Initializing database..."))
		.then(() => db.none(sqlCreateTableUsers))
		.then(() => console.log("Created table Users"))
		.then(() => db.none(sqlCreateTableBiddings))
		.then(() => console.log("Created table Biddings"))
		.then(() => console.log("Database initialization completed"))
		.catch(err => console.error(err.stack));

exports.getUser = userID => db.one(sqlGetUser, { userID: userID });
exports.getAllUsers = () => db.any(sqlGetAllUsers);
exports.createUser = userInfo => db.none(sqlCreateUser, userInfo);
exports.nukeUsers = () => db.none(sqlDeleteAllUsers);

exports.getRecentBiddings = size => db.any(sqlGetRecentBiddings, { size: size });
exports.submitBid = bidInfo => db.none(sqlSubmitBid, bidInfo);
exports.nukeBiddings = () => db.none(sqlDeleteAllBiddings);

exports.getSlotInfo = slot => db.oneOrNone(sqlGetSlotInfo, { slot: slot });
exports.getAllSlotsInfo = () => db.any(sqlGetAllSlotsInfo);