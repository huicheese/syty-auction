import { combineReducers } from 'redux'
import {
  WS_MESSAGE_RECEIVED, 
  INTERACTION_BOX_CLOSE,
  SLOT_CLICK, SLOT_EXPAND, BID_SET, BID_REQUESTED,
  LOGIN_EXPAND, LOGIN_SUCCESS
} from './actions'
import {
  CAL_APPEND, CAL_CLEAR, CAL_BACK, CAL_INCREMENT
} from './components/BiddingNumPad'
import { reducer as reduxFormReducer } from 'redux-form';

const numSlot = 25
const numEvents = 35
const stubSlots = new Array(numSlot).fill().map(
  (e,i) => ({
    index: i,
    highestBidder: {}
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
    switch (action.type) {
      case WS_MESSAGE_RECEIVED:
        if(action.slots && action.slots.length) {
          let newState = state.slice()
          action.slots.forEach(s => newState[s.index] = s)
          return newState
        }
      default:
        // empty
    }
    return state
}

const activityEvents = (state = [], action) => {
    switch (action.type) {
      case WS_MESSAGE_RECEIVED:
        if(action.events && action.events.length) {
          let shifts = action.events.length - numEvents + state.length
          let newState = shifts > 0 ? state.slice(0, -shifts) :  state.slice()
          newState.unshift(...action.events)
          return newState
        }
      default:
        // empty
    }
    return state
}

const interaction = (state = {
  slotRequested: 2,
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
    case BID_SET:
      return Object.assign({}, state, {
        bidAmount: getNewBidAmount(state.bidAmount, action.instruction)
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

const getNewBidAmount = (old, inst) => {
  let val = parseInt(inst.value);
  let newVal = 0;
  switch(inst.instruction) {
    case CAL_APPEND:
      newVal = old < 100000000000 ? old * 10 + val : old;
      break;
    case CAL_CLEAR:
      newVal = 0;
      break;
    case CAL_BACK:
      newVal = old > 0 ? Math.floor(old/10) : old;
      break;  
    case CAL_INCREMENT:
      newVal = old < 100000000000 && (old + val) < 100000000000 ? old + val : old
      break;
  }
  console.log(old)
  console.log(newVal)
  return newVal;
}

const rootReducer = combineReducers({
  user,
  slots,
  activityEvents,
  interaction,
  form: reduxFormReducer, // mounted under "form"
})

export default rootReducer
