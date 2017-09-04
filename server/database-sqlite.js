var path = require('path');
var Promise = require('bluebird');
var db = require('sqlite')
var createUserStmt, submitBidStmt, slotQueryStmt, allSlotsQueryStmt, userQueryStmt, allUsersQueryStmt, recentBiddingsQueryStmt, nukeBiddingsStmt, nukeUsersStmt, toggleUserStmt, deleteBidStmt, userBiddingsQueryStmt;

exports.initialize = () =>
	Promise
		.resolve()
		.then(() => db.open(path.join(__dirname, '..', 'database.db'), { Promise }))
		.then(() => console.log("Opened database"))
		.then(() => db.run(
			`CREATE TABLE IF NOT EXISTS users (
				user_id TEXT NOT NULL PRIMARY KEY,
				first_name TEXT NOT NULL,
				last_name TEXT NOT NULL,
				company TEXT,
				table_number INTEGER NOT NULL,
				permission INTERGER NOT NULL
			)`
		))
		.then(() => console.log("Created table Users"))
		.then(() => db.run(
			`CREATE TABLE IF NOT EXISTS biddings (
				bid_id TEXT NOT NULL,
				user_id TEXT NOT NULL,
				slot INTEGER NOT NULL,
				bid INTEGER NOT NULL,
				added_ts DATETIME DEFAULT CURRENT_TIMESTAMP
			)`
		))
		.then(() => console.log("Created table Biddings"))
		.then(() => {
			db.prepare('INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?, 1)')
			.then(stmt => createUserStmt = stmt);

			db.prepare('INSERT INTO biddings(bid_id, user_id, slot, bid) VALUES(?, ?, ?, ?)')
			.then(stmt => submitBidStmt = stmt);

			db.prepare(`
				SELECT t.slot, t.bid, JSON_ARRAY(JSON_OBJECT('user_id', t.user_id, 'bid_id', t.bid_id, 'added_ts', t.added_ts)) AS bid_infos
				FROM biddings t
				WHERE t.bid =
				    (SELECT MAX(h.bid)
				    FROM biddings h
				    WHERE h.slot = t.slot)
				AND t.slot = ?
				GROUP BY t.slot, t.bid
				`)
			.then(stmt => slotQueryStmt = stmt);

			db.prepare(`
				SELECT t.slot, t.bid, JSON_ARRAY(JSON_OBJECT('user_id', t.user_id, 'bid_id', t.bid_id, 'added_ts', t.added_ts)) AS bid_infos
				FROM biddings t
				WHERE t.bid =
				    (SELECT MAX(h.bid)
				    FROM biddings h
				    WHERE h.slot = t.slot)
				GROUP BY t.slot, t.bid
				`)
			.then(stmt => allSlotsQueryStmt = stmt);

			db.prepare(`
				SELECT user_id, first_name, last_name, company, table_number, permission
				FROM users
				WHERE user_id = ?
				`)
			.then(stmt => userQueryStmt = stmt);

			db.prepare(`
				SELECT u.user_id, u.first_name, u.last_name, u.company, u.table_number, u.permission, COALESCE(s.count_bid, 0) AS count_bid
				FROM
					users u
					LEFT OUTER JOIN
					(SELECT user_id, COUNT(*) AS count_bid
					FROM biddings
					GROUP BY user_id) s
					ON (u.user_id = s.user_id)
				ORDER BY u.user_id
				`)
			.then(stmt => allUsersQueryStmt = stmt);

			db.prepare(`
				SELECT bid_id, slot, user_id, bid
				FROM biddings
				ORDER BY rowid DESC
				LIMIT ?
				`)
			.then(stmt => recentBiddingsQueryStmt = stmt);

			db.prepare(`
				SELECT user_id, bid_id, slot, bid, added_ts
				FROM biddings
				WHERE user_id = ?
				ORDER BY added_ts DESC
				`)
			.then(stmt => userBiddingsQueryStmt = stmt);

			db.prepare(`
				DELETE FROM biddings;
				VACCUM;
				`)
			.then(stmt => nukeBiddingsStmt = stmt);

			db.prepare(`
				DELETE FROM users;
				VACCUM;
				`)
			.then(stmt => nukeUsersStmt = stmt);

			db.prepare(`
				UPDATE users
				SET permission = 1 - permission
				WHERE user_id = ?
				`)
			.then(stmt => toggleUserStmt = stmt);

			db.prepare(`
				DELETE FROM biddings
				WHERE bid_id = ? AND slot = ?
				`)
			.then(stmt => deleteBidStmt = stmt);
		})
		.then(() => console.log("Database initialization completed"))
		.catch(err => console.error(err.stack));

exports.getUser = userID =>
	Promise.resolve(userQueryStmt.get(userID));
exports.getAllUsers = () =>
	Promise.resolve(allUsersQueryStmt.all());
exports.createUser = userInfo =>
	Promise.resolve(
		createUserStmt.run(
			userInfo.userID,
			userInfo.firstName,
			userInfo.lastName,
			userInfo.company,
			userInfo.table));
exports.toggleUserPermission = userID =>
	Promise.resolve(toggleUserStmt.run(userID));
exports.nukeUsers = () =>
	Promise.resolve(nukeUsersStmt.run());

exports.getRecentBiddings = size =>
	Promise.resolve(recentBiddingsQueryStmt.all(size));
exports.submitBid = bidInfo =>
	Promise.resolve(
		submitBidStmt.run(
			bidInfo.bidID,
			bidInfo.userID,
			bidInfo.slot,
			bidInfo.bid));
exports.deleteBid = (bidID, slot) =>
	Promise.resolve(deleteBidStmt.run(bidID, slot));
exports.nukeBiddings = () =>
	Promise.resolve(nukeBiddingsStmt.run());

exports.getSlotInfo = slot =>
	Promise.resolve(slotQueryStmt.get(slot));
exports.getAllSlotsInfo = () =>
	Promise.resolve(allSlotsQueryStmt.all());
exports.getUserBiddings = userID =>
	Promise.resolve(userBiddingsQueryStmt.all(userID));