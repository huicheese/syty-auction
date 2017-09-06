exports.setApp = function(app) {
	app.locals.port = 3000
	app.locals.cookiesExpiration = 86400000
	app.locals.eventSnapshotSize = 35
	app.locals.goldenLimit = 3000
};