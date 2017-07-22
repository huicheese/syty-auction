import { combineReducers } from 'redux'
import {
  WS_MESSAGE_RECEIVED
} from './actions'

const numSlot = 15
const numEvents = 35
const stubSlots = new Array(numSlot).fill().map(
  (e,i) => ({
    index: i,
  })
)
const stubEvents = new Array(numEvents).fill().map(
  (e,i) => ({
     index: Math.random(),
  })
)

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


const activityEvents = (state = stubEvents || [], action) => {
    switch (action.type) {
      case WS_MESSAGE_RECEIVED:
        if(action.events && action.events.length) {
          let newState = state.slice(0, -(action.events.length))
          action.events.forEach(e=>e.index=Math.random())
          newState.unshift(...action.events)
          return newState
        }
      default:
        // empty
    }
    return state
}

const rootReducer = combineReducers({
  slots,
  activityEvents
})

export default rootReducer
