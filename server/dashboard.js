var Promise = require('bluebird');
var utils = require('./utils.js');
var database = require('./database.js');

exports.setApp = (app, wsInstance) => {
    app.ws('/updates', (ws, request) => {
        Promise
            .join(
                buildSlotInfoSnapshot(),
                buildEventSnapshot(process.env.EVENT_SNAPSHOT_SIZE || app.locals.eventSnapshotSize),
                (slotInfoSnapshot, eventSnapshot) => ({ slots: slotInfoSnapshot, events: eventSnapshot }))
            .then(snapshotJson => JSON.stringify(snapshotJson))
            .then(snapshotData => ws.send(snapshotData));
    });

    app.post('/submit', (request, response) => {
        utils
            .checkAuth(request.cookies.sytyAuth)
            .then(authValidationResult => validateBid(authValidationResult, request))
            .then(bidValidationResult => executeBid(bidValidationResult))
            .then(submissionResult => respondBiddingResult(submissionResult, response))
            .then(submissionResult => executeUpdate(submissionResult, wsInstance));
    });

    app.post('/adminSubmit', (request, response) => {
        Promise
            .resolve(utils.validateUserInfo(request.body))
            .then(userInfoValidationResult => utils.createUserIfRequired(userInfoValidationResult))
            .then(authValidationResult => validateBid(authValidationResult, request))
            .then(bidValidationResult => executeBid(bidValidationResult))
            .then(submissionResult => respondBiddingResult(submissionResult, response))
            .then(submissionResult => executeUpdate(submissionResult, wsInstance));
    });

    app.get('/areyousure/nukeBiddings', (request, response) => {
        database
            .nukeBiddings()
            .then(() => response.status(200).send('Cleaned up all Biddings history'))
            .catch(err => {
                console.error('Failed to nuke Biddings history', err.stack);
                response.status(400).send('Failed to clean up Biddings history');
            });
    });

    app.get('/areyousure/nukeUsers', (request, response) => {
        database
            .nukeUsers()
            .then(() => response.status(200).send('Cleaned up all Users'))
            .catch(err => {
                console.error('Failed to nuke Users', err.stack);
                response.status(400).send('Failed to clean up Users');
            });
    });

    let bot;
    app.get('/startBot', function (request, response) {
        bot = setInterval(function() {
            wsInstance.getWss('/updates').clients.forEach(function (client) {
                client.send(getRandomUpdates());
            })
        }, 16);
        response.send();
    });

    app.get('/stopBot', function (request, response) {
        if(bot) clearInterval(bot);
        response.send();
    });
};

let buildSlotInfoSnapshot = () =>
    database
        .getAllSlotsInfo()
        .map(slotInfo => parseSlotInfo(slotInfo));

let buildEventSnapshot = (size) =>
    database
        .getRecentBiddings(size)
        .map(event => buildEventUpdate(event.UserID, event.Slot, event.Bid));

let validateBid = (authValidationResult, request) => {
    let requestContent = {
        userID: (authValidationResult.userID) || "",
        slot: (request.body && request.body.slot) || "",
        bid: (request.body && request.body.bid) || "",
    };

    let error;
    if (!authValidationResult.isValid) {
        console.error('Invalid Auth validation result', authValidationResult);
        error = authValidationResult.error || 'Unauthorized';    
    }
    else if (!requestContent.slot || isNaN(requestContent.slot))
        error = 'Slot number is invalid';
    else if (!requestContent.bid || isNaN(requestContent.bid))
        error = 'Bid amount is invalid';

    requestContent.error = error;
    requestContent.isValid = typeof error === 'undefined';
    return requestContent;
};

let executeBid = (validationResult) => {
    if (!validationResult.isValid)
        return validationResult;

    return database
                .submitBid(validationResult.userID, validationResult.slot, validationResult.bid)
                .then(() => validationResult)
                .catch(err => {
                    validationResult.error = 'Failed to submit';
                    validationResult.isValid = false;
                    console.error(validationResult.error, err.stack);
                    return validationResult;
                });
};

let respondBiddingResult = (submissionResult, response) => {
    if (submissionResult.isValid)
        response.status(200).send('Submit successful');
    else
        response.status(400).send(submissionResult.error);
    return submissionResult;
};

let executeUpdate = (submissionResult, wsInstance) => {
    if (!submissionResult.isValid)
        return;

    console.log('Sending live update after Bidding', submissionResult);
    buildUpdate(submissionResult.userID, submissionResult.slot, submissionResult.bid)
        .then(updateJson => JSON.stringify(updateJson))
        .then(update => {
            let clients = wsInstance.getWss().clients;
            console.log('Sending live data to %d connected clients', clients.size);
            clients.forEach(client => client.send(update))
        });
};

let buildUpdate = (userID, slot, bid) =>
    Promise
        .join(
            buildSlotInfoUpdate(slot),
            buildEventUpdate(userID, slot, bid),
            (slotInfoUpdate, eventUpdate) => ({ slots: [slotInfoUpdate], events: [eventUpdate] })
        );

let buildSlotInfoUpdate = slot =>
    database
        .getSlotInfo(slot)
        .then(slotInfo => parseSlotInfo(slotInfo));

let parseSlotInfo = slotInfo => {
    let index = parseInt(slotInfo.Slot) - 1;
    if (slotInfo.Bid > 0) {
        return getUserInfo(slotInfo.UserID)
                    .then(userInfo => ({
                        index: index,
                        highestBid: slotInfo.Bid,
                        highestBidder: userInfo
                    }));
    }
    return { index: index };
};

let buildEventUpdate = (userID, slot, bid) =>
    getUserInfo(userID)
        .then(userInfo => ({
            slot: slot,
            bid: bid,
            bidder: userInfo,
            index: utils.uuid()
        }));

let getUserInfo = userID =>
    database
        .getUser(userID)
        .then(user => ({
            userID: userID,
            firstName: user.FirstName,
            lastName: user.LastName,
            company: user.Company,
            table: user.TableNumber
        }));

/* STUB */

const getRandomArbitrary = (min, max) => Math.round((Math.random() * (max - min) + min) * 100) / 100

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const nameArray = ["Darwin", "Paris", "Jackie", "Dominick", "Abel", "Nelson", "Jeff", "Ivan", "Gene", "Bill", "William", "Myron", "Clayton", "Bryant", "Johnie", "Graig", "Elliott", "Dante", "Benjamin", "Brant", "Bertram", "Morgan", "Johnny", "Jonathan", "Wilfred", "Robert", "Robin", "Mohammed", "Joey", "Bradly", "Denver", "Elden", "Ryan", "Leigh", "Jc", "Asa", "Hayden", "Darrell", "Von", "Gary", "Augustus", "Alphonso", "Logan", "Leon", "Marquis", "Miguel", "Ignacio", "Don", "Derrick", "Jarod"]
const getRandomName = () => nameArray[getRandomInt(0,nameArray.length-1)]

const stubSlots = new Array(15).fill().map(
  (e,i) => getStubSlotUpdate()
)

function getStubSlotUpdate(index) {
  return {
    index: index || getRandomInt(0,24),
    highestBid: getRandomArbitrary(1, 1000),
    highestBidder: { firstName: getRandomName() }
  }
}

const stubEvents = new Array(29).fill().map(
  (e,i) => getStubEventUpdates()
)

function getStubEventUpdates() {
  return {
    "bidder": { firstName: getRandomName() },
    "bid": getRandomArbitrary(1, 100),
    "slot": getRandomInt(1,25)
  }
}

let getRandomUpdates = () => {
  let numUpdates = getRandomInt(1,5);
  return JSON.stringify({
    slots: new Array(numUpdates).fill().map((e,i) => getStubSlotUpdate(i)),
    events: new Array(numUpdates).fill().map((e,i) => getStubEventUpdates(i))
  })
}