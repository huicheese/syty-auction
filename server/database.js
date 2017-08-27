var database = require('./database-pg.js');

module.exports = {
	initialize: database.initialize,

	getUser: database.getUser,
	getAllUsers: database.getAllUsers,
	createUser: database.createUser,
	toggleUserPermission: database.toggleUserPermission,
	nukeUsers: database.nukeUsers,

	getRecentBiddings: database.getRecentBiddings,
	submitBid: database.submitBid,
	nukeBiddings: database.nukeBiddings,

	getSlotInfo: database.getSlotInfo,
	getAllSlotsInfo: database.getAllSlotsInfo
};