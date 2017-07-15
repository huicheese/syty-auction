var path = require('path');
var Promise = require('bluebird');
var db = require('sqlite')
var createUserStmt, submitBidStmt, slotQueryStmt, allSlotsQueryStmt, userQueryStmt, userListQueryStmt;

function initialize() {
	Promise
		.resolve()
		.then(() => db.open(path.join(__dirname, '..', 'db', 'database.db'), { Promise }))
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
				SELECT GROUP_CONCAT(UserID) AS MaxBidders, MAX(Bid) AS MaxBid
				FROM Biddings
				WHERE Slot = ?
				`)
			.then(stmt => slotQueryStmt = stmt);

			db.prepare(`
				SELECT t.Slot, h.MaxBid, GROUP_CONCAT(t.UserID) AS MaxBidders
				FROM
					Biddings t

					INNER JOIN

					(SELECT Slot, MAX(bid) AS MaxBid
					FROM Biddings
					GROUP BY Slot) h

					ON t.Slot = h.Slot AND t.Bid = h.MaxBid
				GROUP BY t.Slot
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
};

function getUser(userID) {
	return Promise.resolve(userQueryStmt.get(userID));
}

function createUser(userID, firstName, lastName, company, table) {
	return Promise.resolve(createUserStmt.run(userID, firstName, lastName, company, table));
}

module.exports = {
	initialize: initialize,
	createUser: createUser,

 //  	submitBid: function(userID, slot, bid) {
 //  		submitBidStmt.run(userID, slot, bid);
 //  	},

 //  	getFullSnapshot: function(snapshotCallback) {
 //  		allSlotsQueryStmt.all(function(err, rows) {
 //  			snapshotCallback(rows);
 //  		});
 //  	},

 //  	getSlotSnapshot: function(slot, updateCallback) {
 //  		slotQueryStmt.get(slot, function(err, row) {
	// 		updateCallback(row);
	// 	});
 //  	},

	getUser: getUser,

 //  	getUserList: function(userIDs, callback) {
 //  		userListQueryStmt.all(userIDs, function(err, rows) {
 //  			callback(rows);
 //  		});
 //  	}
};