var path = require('path');
var Promise = require('bluebird');
var db = require('sqlite')
var createUserStmt, submitBidStmt, slotQueryStmt, allSlotsQueryStmt, userQueryStmt, userListQueryStmt;

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
				UserID TEXT NOT NULL,
				Slot INTEGER NOT NULL,
				Bid INTEGER NOT NULL
			)`
		))
		.then(() => console.log("Created table Biddings"))
		.then(() => {
			db.prepare('INSERT OR IGNORE INTO Users VALUES(?, ?, ?, ?, ?)')
			.then(stmt => createUserStmt = stmt);

			db.prepare('INSERT INTO Biddings VALUES(?, ?, ?)')
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
				WHERE UserID IN (?)
				`)
			.then(stmt => userListQueryStmt = stmt);
		})
		.then(() => console.log("Database initialization completed"))
		.catch(err => console.error(err.stack));

let getUser = userID => Promise.resolve(userQueryStmt.get(userID));

let createUser = (userID, firstName, lastName, company, table) =>
	Promise.resolve(createUserStmt.run(userID, firstName, lastName, company, table));

let submitBid = (userID, slot, bid) =>
	Promise.resolve(submitBidStmt.run(userID, slot, bid));

let getSlotInfo = slot =>
	Promise.resolve(slotQueryStmt.get(slot));

let getAllSlotsInfo = () =>
	Promise.resolve(allSlotsQueryStmt.all());

module.exports = {
	initialize: initialize,
	createUser: createUser,
	getUser: getUser,
	submitBid: submitBid,
	getSlotInfo: getSlotInfo,
	getAllSlotsInfo: getAllSlotsInfo
};