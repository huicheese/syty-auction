import { combineReducers } from 'redux'
import {
  WS_MESSAGE_RECEIVED, 
  INTERACTION_BOX_CLOSE,
  SLOT_CLICK, SLOT_EXPAND, BID_REQUESTED, BID_SUCCESS, BID_FAIL,
  LOGIN_EXPAND, LOGIN_SUCCESS, LOGIN_FAIL,
  FETCH_ALL_USERS_COMPLETED,
  FETCH_USER_BIDDINGS_COMPLETED
} from './actions'
import { reducer as reduxFormReducer } from 'redux-form';

const numSlot = 30
const numEvents = 6
const stubSlots = new Array(numSlot).fill().map(
  (e,i) => ({
    index: i,
    highestBidders: {}
  })
)
const stubEvents = new Array(numEvents).fill().map(
  (e,i) => ({})
)

const nc = (state={
  msg:null
}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { 
        msg: "Let's get started!", 
        isError: false,
        ts: Date.now()
      }
    case LOGIN_FAIL:
      return { 
        msg: "Hmmm... " + action.error,
        isError: true,
        ts: Date.now()
      }  
    case BID_SUCCESS:
      return { 
        msg: "Bidded $ " + Intl.NumberFormat().format(action.bid) + " on slot " + action.slot,
        isError: false,
        ts: Date.now()
      }
    case BID_FAIL:
      return { 
        msg: action.error,
        isError: true,
        ts: Date.now()
      }
  }
  return state;
}

// retrieve login state from cookie
const user = (state = {
  isLoggedIn: false,
  userID: null
}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        userID: action.token
    })
  }
  return state;
}
const bidderSorter = (b1, b2) => {
  if (b1.sum > b2.sum)
    return -1;
  if (b1.sum < b2.sum)
    return 1;

  if (b1.bidTS < b2.bidTS)
    return -1;
  if (b1.bidTS > b2.bidTS)
    return 1;

  return 0;
}

const goldenLimit = (state = 3000, action) => {
  switch (action.type) {
    case WS_MESSAGE_RECEIVED:
      let newState = action.goldenLimit || state;
      return newState;
    default:
      //empty
  }
  return state
}

const slots = (state = {
  slots: stubSlots || [],
  bidders: {},
  byUser: {},
  top: []
}, action) => {
    let newState;
    switch (action.type) {
      case WS_MESSAGE_RECEIVED:
        if(action.slots && action.slots.length) {
          newState = {};

          newState.slots = state.slots.map(i => Object.assign({}, i, {hasChange: false}))
          if(action.isLiveUpdate) {
            action.slots.forEach(s => s.hasChange = true)
          }
          action.slots.forEach(s => newState.slots[s.index] = Object.assign({},s))

          newState.bidders = {}
          newState.byUser = {}
          
          newState.slots.forEach(slot => {
            if(!slot.highestBidders || slot.highestBidders.length != 1)
              return;

            let thisUserID = slot.highestBidders[0].userID
            if(!newState.bidders[thisUserID])
               newState.bidders[thisUserID] = Object.assign({}, slot.highestBidders[0], {sum: 0})
            let bidder = newState.bidders[thisUserID]
            if(bidder.bidTS || bidder.bidTS > slot.highestBidders[0].bidTS)
              bidder.bidTS = slot.highestBidders[0].bidTS

            bidder.sum = (bidder.sum || 0) + slot.highestBid

            let slotOfUser = newState.byUser[thisUserID] || []
            slotOfUser.push(slot.index + 1)
            newState.byUser[thisUserID] = slotOfUser
          })

          let top3 = Object.keys(newState.bidders).map(
              (key, index) => newState.bidders[key]);
          top3.sort(bidderSorter)
          newState.top3 = top3.slice(0,3)
          
          return newState
        }
        break;
      case SLOT_CLICK:
        newState = Object.assign({}, state)
        newState.slots[action.slot - 1].hasChange = false;
        return newState;
      default:
        // empty
    }
    return state
}

let cur = 0;
const nextSlot = () => {
  cur = (cur+numEvents-1)%numEvents;
  return cur;
}
const activityEvents = (state = stubEvents, action) => {
    switch (action.type) {
      case WS_MESSAGE_RECEIVED:
        if(action.events && action.events.length) {
          let newState = state.slice()
          action.events.reverse().forEach(e => {
            for(let i=0; i<newState.length; i++) {
              if(newState[i].slot == e.slot) {
                if(newState[i].bid <= e.bid)
                  newState[i] = e;
                return;
              }
            }
            newState[nextSlot()] = e; // side effect of moving nextSlot/cur backward
          })

          return newState;
        }
      default:
        // empty
    }
    return state
}

const interaction = (state = {
  slotRequested: null,
  slotExpanded: null,
  bidAmount: 0,
  loginExpanded: false
}, action) => {
  switch(action.type) {
    case INTERACTION_BOX_CLOSE:
      return Object.assign({}, state, {
        slotRequested: null,
        slotExpanded: null,
        loginExpanded: false
      })      
    case SLOT_EXPAND:
      return Object.assign({}, state, {
        slotExpanded: action.slot
      })
    case SLOT_CLICK:
      return Object.assign({}, state, {
        slotRequested: action.slot
      })
    case BID_REQUESTED:
      return Object.assign({}, state, {
        slotRequested: null
      })
    case LOGIN_EXPAND:
      return Object.assign({}, state, {
        loginExpanded: true
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loginExpanded: false
    })  
    default:
      // empty
  }
  return state
}

const users = (state = [], action) => {
  switch(action.type) {
    case FETCH_ALL_USERS_COMPLETED:
      return converJsonStringToArray(action.msg)
    default:
      // empty
  }
  return state
}

const userBiddings = (state = [], action) => {
  switch(action.type) {
    case FETCH_USER_BIDDINGS_COMPLETED:
      return converJsonStringToArray(action.msg)
    default:
      // empty
  }
  return state
}

const converJsonStringToArray = msg => {
  let result = []
  JSON.parse(msg).forEach(item => result.push(item))
  return result
}

const rootReducer = combineReducers({
  nc,
  user,
  slots,
  activityEvents,
  interaction,
  users,
  userBiddings,
  goldenLimit,
  form: reduxFormReducer, // mounted under "form"
})

export default rootReducer
