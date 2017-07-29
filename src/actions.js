import fetch from 'isomorphic-fetch'
import { WS_CONNECT, WS_DISCONNECT } from './middlewares/socketMiddleware'

export const DASHBOARD_UPDATES = 'DASHBOARD_UPDATES'
export const WS_CONNECTING = 'WS_CONNECTING'
export const WS_CONNECTED = 'WS_CONNECTED'
export const WS_DISCONNECTED = 'WS_DISCONNECTED'
export const WS_MESSAGE_RECEIVED = 'WS_MESSAGE_RECEIVED'


export const initializeConnection = () => {
  return {
    type: WS_CONNECT
  }
}

export const connecting = () => {
  return {
    type: WS_CONNECTING
  }
}
export const connected = () => {
  return {
    type: WS_CONNECTED
  }
}
export const disconnected = () => {
  return {
    type: WS_DISCONNECTED
  }
}
export const messageReceived = (msg) => {
  return {
    type: WS_MESSAGE_RECEIVED,
    events: msg.events,
    slots: msg.slots
  }
}