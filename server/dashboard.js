var Promise = require('bluebird');
var utils = require('./utils.js');
var database = require('./database.js');

exports.setApp = (app, wsInstance) => {
    app.ws('/updates', (ws, request) => {
        ws.send(JSON.stringify({slots: stubSlots, events: stubEvents}));
    });

    app.post('/submit', (request, response) => {
        utils
            .checkAuth(request.cookies.sytyAuth)
            .then(isValidAuth => executeSubmit(isValidAuth, request, response))
            .then(isSubmitSuccessful => executeUpdate(isSubmitSuccessful, request, wsInstance));
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

let executeSubmit = (isValidAuth, request, response) => {
    let valid = false;
    if (!isValidAuth)
        response.status(400).send("Please login first");
    else if (!request.body)
        response.status(400).send('Bidding form is empty')
    else if (!request.body.slot || isNaN(request.body.slot))
        response.status(400).send('Slot number is invalid')
    else if (!request.body.bid || isNaN(request.body.bid))
        response.status(400).send('Bid amount is invalid')
    else
        valid = true;

    return valid &&
        database
            .submitBid(request.cookies.sytyAuth, request.body.slot, request.body.bid)
            .then(() => {
                response.status(200).send('Submit successful');
                return true;
            })
            .catch(err => {
                console.error('Failed to submit', err.stack);
                response.status(400).send('Failed to submit');
                return false;
            });
};

let executeUpdate = (isSubmitSuccessful, request, wsInstance) => {
    if (!isSubmitSuccessful)
        return;

    console.log('Sending live update on Slot[%s] after Bid of [%s]', request.body.slot, request.body.bid);
    buildUpdate(request.cookies.sytyAuth, request.body.slot, request.body.bid)
        .then(updateJson => JSON.stringify(updateJson))
        .then(update => wsInstance.getWss().clients.forEach(client => client.send(update)));
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
        .then(slotInfo => parseSlotInfo(parseInt(slot)-1, slotInfo));

let parseSlotInfo = (slot, slotInfo) =>
    Promise
        .resolve()
        .then(() => {
            if (slotInfo.MaxBid > 0) {
                return getUserInfo(slotInfo.MaxBidders.split(',')[0])
                            .then(userInfo => ({
                                index: slot,
                                highestBid: slotInfo.MaxBid,
                                highestBidder: userInfo
                            }));
            }
            return { index: slot };
        });

let buildEventUpdate = (userID, slot, bid) =>
    getUserInfo(userID)
        .then(userInfo => ({
            slot: slot,
            bid: bid,
            bidder: userInfo
        }));

let getUserInfo = userID =>
    database
        .getUser(userID)
        .then(user => ({
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