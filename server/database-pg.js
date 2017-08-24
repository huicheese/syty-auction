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

let initialize = () =>
	Promise
		.resolve()
		.then(() => console.log("Initializing database..."))
		.then(() => db.none(sqlCreateTableUsers))
		.then(() => console.log("Created table Users"))
		.then(() => db.none(sqlCreateTableBiddings))
		.then(() => console.log("Created table Biddings"))
		.then(() => console.log("Database initialization completed"))
		.catch(err => console.error(err.stack));

let getUser = userID => db.one(sqlGetUser, { userID: userID });
let getAllUsers = () => db.any(sqlGetAllUsers);
let createUser = userInfo => db.none(sqlCreateUser, userInfo);
let nukeUsers = () => db.none(sqlDeleteAllUsers);

let getRecentBiddings = size => db.any(sqlGetRecentBiddings, { size: size });
let submitBid = bidInfo => db.none(sqlSubmitBid, bidInfo);
let nukeBiddings = () => db.none(sqlDeleteAllBiddings);

let getSlotInfo = slot => db.oneOrNone(sqlGetSlotInfo, { slot: slot });
let getAllSlotsInfo = () => db.any(sqlGetAllSlotsInfo);

module.exports = {
	initialize: initialize,

	getUser: getUser,
	getAllUsers: getAllUsers,
	createUser: createUser,
	nukeUsers: nukeUsers,

	getRecentBiddings: getRecentBiddings,
	submitBid: submitBid,
	nukeBiddings: nukeBiddings,

	getSlotInfo: getSlotInfo,
	getAllSlotsInfo: getAllSlotsInfo
};