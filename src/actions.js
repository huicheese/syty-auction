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

const loginRequested = () => ({ type: "LOGIN_REQUESTED"})
const loginSuccess = () => ({ type: "LOGIN_SUCCESS"})
const loginFail = (msg) => ({ type: "LOGIN_FAIL", error:msg})

export function fetchLogin(firstName, lastName, company, table) {
  return dispatch => {
    dispatch(loginRequested())
    return basePost({
                  firstName:firstName,
                  lastName:lastName,
                  company:company,
                  table:table
                })
      .then(response => response.ok ?
        dispatch(loginSuccess()) : 
        response.text().then(msg => dispatch(loginFail(msg)))
      ).catch(v1 => console.log(v1))

  }
}

function basePost(data) {
  let toSend = JSON.stringify(data)
  return fetch(`login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: toSend})
}

