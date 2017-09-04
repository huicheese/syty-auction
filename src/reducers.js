import { combineReducers } from 'redux'
import {
  WS_MESSAGE_RECEIVED, 
  INTERACTION_BOX_CLOSE,
  SLOT_CLICK, SLOT_EXPAND, BID_REQUESTED,
  LOGIN_EXPAND, LOGIN_SUCCESS
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

const slots = (state = stubSlots || []
, action) => {
    let newState;
    switch (action.type) {
      case WS_MESSAGE_RECEIVED:
        if(action.slots && action.slots.length) {
          newState = state.map(i => Object.assign({}, i, {hasChange: false}))
          action.slots.forEach(s => newState[s.index] = s)
          if(action.isLiveUpdate) {
            action.slots.forEach(s => s.hasChange = true)
          }
          let sum = {}
          newState.forEach(s => {
            if(!s.highestBidders || s.highestBidders.length != 1)
              return;
            sum[s.highestBidders[0].userID] = (sum[s.highestBidders[0].userID] || 0) + s.highestBid
            
          })

          newState.forEach(s => {
            if(s.highestBidders && s.highestBidders.length > 0)
              s.highestBidders.forEach(b => {
                b.sum = sum[b.userID]
              })
          })

          return newState
        }
        break;
      case SLOT_CLICK:
        newState = state.slice();
        newState[action.slot - 1].hasChange = false;
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

const rootReducer = combineReducers({
  user,
  slots,
  activityEvents,
  interaction,
  form: reduxFormReducer, // mounted under "form"
})

export default rootReducer
