var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db, submitBidStmt, slotQueryStmt, allSlotsQueryStmt;

function createDatabase() {
	console.log('Initializing Database...');
	db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'database.db'), createUserTable);
};

function createUserTable() {
	console.log('Creating User table...');
	db.run(`
		CREATE TABLE IF NOT EXISTS Users (
			UserID TEXT NOT NULL PRIMARY KEY,
			FirstName TEXT NOT NULL,
			LastName TEXT NOT NULL,
			Company TEXT,
			Table INTEGER NOT NULL
		)
		`, createBiddingTable);
};

function createBiddingTable() {
	console.log('Creating Biddings table...');
	db.run(`
		CREATE TABLE IF NOT EXISTS Biddings (
			UserID TEXT NOT NULL,
			Slot INTEGER NOT NULL,
			Bid INTEGER NOT NULL
		)
		`, prepareStatements);
};

function prepareStatements() {
	console.log('Preparing statements...');

	submitBidStmt =
		db.prepare('INSERT INTO Biddings VALUES(?, ?, ?)');

	slotQueryStmt =
		db.prepare(`
			SELECT GROUP_CONCAT(UserID) AS MaxBidders, MAX(Bid) AS MaxBid
			FROM Biddings
			WHERE Slot = ?
			`);
		
	allSlotsQueryStmt =
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
			`);

	console.log("Database initialization completed");
};

module.exports = {
	initialize: function() {
		createDatabase();
	},

  	submitBid: function(userID, slot, bid) {
  		submitBidStmt.run(userID, slot, bid);
  	},

  	getFullSnapshot: function(snapshotCallback) {
  		allSlotsQueryStmt.all(function(err, rows) {
  			snapshotCallback(rows);
  		});
  	},

  	getSlotSnapshot: function(slot, updateCallback) {
  		slotQueryStmt.get(slot, function(err, row) {
			updateCallback(row);
		});
  	}
};