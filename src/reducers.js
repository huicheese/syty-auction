import { combineReducers } from 'redux'
import {
  WS_MESSAGE_RECEIVED, 
  INTERACTION_BOX_CLOSE,
  SLOT_CLICK, SLOT_EXPAND, BID_REQUESTED,
  LOGIN_EXPAND, LOGIN_SUCCESS
} from './actions'
import { reducer as reduxFormReducer } from 'redux-form';

const numSlot = 30
const numEvents = 10
const stubSlots = new Array(numSlot).fill().map(
  (e,i) => ({
    index: i,
    highestBidders: {}
  })
)

// retrieve login state from cookie
const user = (state = {
  isLoggedIn: false
}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true
    })
  }
  return state;
}

const slots = (state = stubSlots || [], action) => {
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

const activityEvents = (state = [], action) => {
    switch (action.type) {
      case WS_MESSAGE_RECEIVED:
        if(action.events && action.events.length) {
          let newState = state.slice()
          newState.unshift(...action.events)
          return newState.slice(0, numEvents);
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
