var database = require('./database-pg.js');

module.exports = {
	initialize: database.initialize,

	getUser: database.getUser,
	getAllUsers: database.getAllUsers,
	createUser: database.createUser,
	toggleUserPermission: database.toggleUserPermission,
	nukeUsers: database.nukeUsers,
	reportAllUsers: database.reportAllUsers,

	getRecentBiddings: database.getRecentBiddings,
	submitBid: database.submitBid,
	deleteBid: database.deleteBid,
	nukeBiddings: database.nukeBiddings,
	reportAllBiddings: database.reportAllBiddings,

	getSlotInfo: database.getSlotInfo,
	getAllSlotsInfo: database.getAllSlotsInfo,
	getUserBiddings: database.getUserBiddings
};