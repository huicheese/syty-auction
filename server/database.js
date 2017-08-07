var path = require('path');
var Promise = require('bluebird');
var db = require('sqlite')
var createUserStmt, submitBidStmt, slotQueryStmt, allSlotsQueryStmt, userQueryStmt, allUsersQueryStmt, recentBiddingsQueryStmt, nukeBiddingsStmt, nukeUsersStmt;

let initialize = () =>
	Promise
		.resolve()
		.then(() => db.open(path.join(__dirname, '..', 'database.db'), { Promise }))
		.then(() => console.log("Opened database"))
		.then(() => db.run(
			`CREATE TABLE IF NOT EXISTS Users (
				UserID TEXT NOT NULL PRIMARY KEY,
				FirstName TEXT NOT NULL,
				LastName TEXT NOT NULL,
				Company TEXT,
				TableNumber INTEGER NOT NULL
			)`
		))
		.then(() => console.log("Created table Users"))
		.then(() => db.run(
			`CREATE TABLE IF NOT EXISTS Biddings (
				BidID TEXT NOT NULL,
				UserID TEXT NOT NULL,
				Slot INTEGER NOT NULL,
				Bid INTEGER NOT NULL
			)`
		))
		.then(() => console.log("Created table Biddings"))
		.then(() => {
			db.prepare('INSERT OR IGNORE INTO Users VALUES(?, ?, ?, ?, ?)')
			.then(stmt => createUserStmt = stmt);

			db.prepare('INSERT INTO Biddings VALUES(?, ?, ?, ?)')
			.then(stmt => submitBidStmt = stmt);

			db.prepare(`
				SELECT t.Slot, t.UserID, t.Bid
				FROM Biddings t
				WHERE t.rowid =
					(SELECT h.rowid
					FROM Biddings h
					WHERE t.Slot = h.Slot
					ORDER BY h.Bid DESC, h.rowid
					LIMIT 1)
				AND t.Slot = ?
				`)
			.then(stmt => slotQueryStmt = stmt);

			db.prepare(`
				SELECT t.Slot, t.UserID, t.Bid
				FROM Biddings t
				WHERE t.rowid =
					(SELECT h.rowid
					FROM Biddings h
					WHERE t.Slot = h.Slot
					ORDER BY h.Bid DESC, h.rowid
					LIMIT 1)
				`)
			.then(stmt => allSlotsQueryStmt = stmt);

			db.prepare(`
				SELECT UserID, FirstName, LastName, Company, TableNumber
				FROM Users
				WHERE UserID = ?
				`)
			.then(stmt => userQueryStmt = stmt);

			db.prepare(`
				SELECT UserID, FirstName, LastName, Company, TableNumber
				FROM Users
				`)
			.then(stmt => allUsersQueryStmt = stmt);

			db.prepare(`
				SELECT BidID, Slot, UserID, Bid
				FROM Biddings
				ORDER BY rowid DESC
				LIMIT ?
				`)
			.then(stmt => recentBiddingsQueryStmt = stmt);

			db.prepare(`
				DELETE FROM Biddings;
				VACCUM;
				`)
			.then(stmt => nukeBiddingsStmt = stmt);

			db.prepare(`
				DELETE FROM Users;
				VACCUM;
				`)
			.then(stmt => nukeUsersStmt = stmt);
		})
		.then(() => console.log("Database initialization completed"))
		.catch(err => console.error(err.stack));

let getUser = userID => Promise.resolve(userQueryStmt.get(userID));

let createUser = (userID, firstName, lastName, company, table) =>
	Promise.resolve(createUserStmt.run(userID, firstName, lastName, company, table));

let submitBid = (bidID, userID, slot, bid) =>
	Promise.resolve(submitBidStmt.run(bidID, userID, slot, bid));

let getSlotInfo = slot =>
	Promise.resolve(slotQueryStmt.get(slot));

let getAllSlotsInfo = () =>
	Promise.resolve(allSlotsQueryStmt.all());

let getRecentBiddings = size =>
	Promise.resolve(recentBiddingsQueryStmt.all(size));

let nukeBiddings = () =>
	Promise.resolve(nukeBiddingsStmt.run());

let nukeUsers = () =>
	Promise.resolve(nukeUsersStmt.run());

let getAllUsers = () =>
	Promise.resolve(allUsersQueryStmt.all());

module.exports = {
	initialize: initialize,
	createUser: createUser,
	getUser: getUser,
	submitBid: submitBid,
	getSlotInfo: getSlotInfo,
	getAllSlotsInfo: getAllSlotsInfo,
	getRecentBiddings: getRecentBiddings,
	nukeBiddings: nukeBiddings,
	nukeUsers: nukeUsers,
	getAllUsers: getAllUsers
};