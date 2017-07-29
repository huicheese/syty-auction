import { combineReducers } from 'redux'
import {
  WS_MESSAGE_RECEIVED
} from './actions'
import { reducer as reduxFormReducer } from 'redux-form';

const numSlot = 25
const numEvents = 35
const stubSlots = new Array(numSlot).fill().map(
  (e,i) => ({
    index: i,
    highestBidder: {}
  })
)

const user = (state = {}, action) => {
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


const rootReducer = combineReducers({
  user,
  slots,
  activityEvents,
  form: reduxFormReducer, // mounted under "form"
})

export default rootReducer
