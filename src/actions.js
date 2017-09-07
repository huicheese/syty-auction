import fetch from 'isomorphic-fetch'
import { WS_CONNECT, WS_DISCONNECT } from './middlewares/socketMiddleware'

export const DASHBOARD_UPDATES = 'DASHBOARD_UPDATES'
export const WS_CONNECTING = 'WS_CONNECTING'
export const WS_CONNECTED = 'WS_CONNECTED'
export const WS_DISCONNECTED = 'WS_DISCONNECTED'
export const WS_MESSAGE_RECEIVED = 'WS_MESSAGE_RECEIVED'

export const LOGIN_EXPAND = 'LOGIN_EXPAND'
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const INTERACTION_BOX_CLOSE = 'INTERACTION_BOX_CLOSE'

export const SLOT_CLICK = 'SLOT_CLICK'
export const SLOT_EXPAND = 'SLOT_EXPAND'

export const BID_REQUESTED = 'BID_REQUESTED'
export const BID_SUCCESS = 'BID_SUCCESS'
export const BID_FAIL = 'BID_FAIL'

export const TOGGLE_SYSTEM_PERMISSION_REQUESTED = 'TOGGLE_SYSTEM_PERMISSION_REQUESTED'
export const TOGGLE_SYSTEM_PERMISSION_COMPLETED = 'TOGGLE_SYSTEM_PERMISSION_COMPLETED'

export const TOGGLE_USER_PERMISSION_REQUESTED = 'TOGGLE_USER_PERMISSION_REQUESTED'
export const TOGGLE_USER_PERMISSION_COMPLETED = 'TOGGLE_USER_PERMISSION_COMPLETED'

export const FETCH_ALL_USERS_REQUESTED = 'FETCH_ALL_USERS_REQUESTED'
export const FETCH_ALL_USERS_COMPLETED = 'FETCH_ALL_USERS_COMPLETED'

export const FETCH_USER_BIDDINGS_REQUESTED = 'FETCH_USER_BIDDINGS_REQUESTED'
export const FETCH_USER_BIDDINGS_COMPLETED = 'FETCH_USER_BIDDINGS_COMPLETED'

export const DELETE_BID_REQUESTED = 'DELETE_BID_REQUESTED'
export const DELETE_BID_COMPLETED = 'DELETE_BID_COMPLETED'

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
    slots: msg.slots,
    isLiveUpdate: msg.isLiveUpdate,
    goldenLimit: msg.goldenLimit
  }
}

const loginRequested = () => ({ type: LOGIN_REQUESTED})
const loginSuccess = (token) => ({ 
  type: LOGIN_SUCCESS,
  token: token
})
export const loginFail = (msg) => ({ type: LOGIN_FAIL, error:msg})

export const expandLogin = () => ({
  type: LOGIN_EXPAND
})

export function fetchLogin(firstName, lastName, company, table) {
  return dispatch => {
    dispatch(loginRequested())
    return basePost(`login`, {
                  firstName:firstName,
                  lastName:lastName,
                  company:company,
                  table:table
                })
      .then(response => response.ok ?
        response.text().then(token => dispatch(loginSuccess(token)))
        : 
        response.text().then(msg => dispatch(loginFail(msg)))
      ).catch(v1 => console.log(v1))

  }
}
export const closeInteractionBox = () => ({
  type: INTERACTION_BOX_CLOSE
})
export const clickSlot = (slot) => ({
  type: SLOT_CLICK,
  slot
})

export const expandSlot = (slot) => ({
  type: SLOT_EXPAND,
  slot
})

const bidRequested = (opID) => ({ opID: opID, type: BID_REQUESTED})
const bidSuccess = (opID, slot, bid) => ({ opID: opID, type: BID_SUCCESS, slot, bid})
export const bidFail = (opID, msg, slot, bid) => ({ opID: opID, type: BID_FAIL, error:msg, slot, bid})

export function fetchBid(slot, bid) {
  let opID = slot + "-" + bid + "-" + Math.random()
  return dispatch => {
    dispatch(bidRequested(opID))
    return basePost(`submit`, {bid, slot})
      .then(response => response.ok ?
        dispatch(bidSuccess(opID, slot, bid)) : 
        response.text().then(msg => dispatch(bidFail(opID, msg, slot, bid)))
      ).catch(v1 => console.log(opID + ": " + v1))

  }
}

export function fetchAdminBid(firstName, lastName, company, table, slot, bid) {
  let opID = slot + "-" + bid + "-" + Math.random()
  return dispatch => {
    dispatch(bidRequested(opID))
    return basePost(`adminSubmit`, {firstName, lastName, company, table, bid, slot})
      .then(response => response.ok ?
        dispatch(bidSuccess(opID, slot, bid)) : 
        response.text().then(msg => dispatch(bidFail(opID, msg)))
      ).catch(v1 => console.log(opID + ": " + v1))

  }
}

const toggleSystemPermissionRequested = (opID) => ({ opID: opID, type: TOGGLE_SYSTEM_PERMISSION_REQUESTED })
const toggleSystemPermissionCompleted = (opID, msg) => ({ opID: opID, type: TOGGLE_SYSTEM_PERMISSION_COMPLETED, msg: msg })

export function toggleSystemPermission() {
  let opID = "toggleSystemPermission-" + Math.random()
  return dispatch => {
    dispatch(toggleSystemPermissionRequested(opID))
    return basePost(`/areyousure/toggleBiddingPermission`, {})
      .then(response =>
        response.text().then(msg => dispatch(toggleSystemPermissionCompleted(opID, msg)))
      ).catch(v1 => console.log(opID + ": " + v1))
  }
}

const toggleUserPermissionRequested = (opID) => ({ opID: opID, type: TOGGLE_USER_PERMISSION_REQUESTED })
const toggleUserPermissionCompleted = (opID, msg) => ({ opID: opID, type: TOGGLE_USER_PERMISSION_COMPLETED, msg: msg })

export function toggleUserPermission(userID) {
  let opID = "toggleUserPermission-" + userID + "-" + Math.random()
  return dispatch => {
    dispatch(toggleUserPermissionRequested(opID))
    return basePost(`/areyousure/toggleUserPermission`, {userID})
      .then(response =>
        response
          .text()
          .then(msg => dispatch(toggleUserPermissionCompleted(opID, msg)))
          .then(() => dispatch(fetchAllUsers()))
      ).catch(v1 => console.log(opID + ": " + v1))
  }
}

const fetchAllUsersRequested = (opID) => ({ opID: opID, type: FETCH_ALL_USERS_REQUESTED })
const fetchAllUsersCompleted = (opID, msg) => ({ opID: opID, type: FETCH_ALL_USERS_COMPLETED, msg: msg })

export function fetchAllUsers() {
  let opID = "fetchAllUsers-" + Math.random()
  return dispatch => {
    dispatch(fetchAllUsersRequested(opID))
    return basePost(`/reporting/users`, {})
      .then(response =>
        response.text().then(msg => dispatch(fetchAllUsersCompleted(opID, msg)))
      ).catch(v1 => console.log(opID + ": " + v1))
  }
}

const fetchUserBidsRequested = (opID) => ({ opID: opID, type: FETCH_USER_BIDDINGS_REQUESTED })
const fetchUserBidsCompleted = (opID, msg) => ({ opID: opID, type: FETCH_USER_BIDDINGS_COMPLETED, msg: msg })

export function fetchUserBids(userID) {
  let opID = "fetchUserBids-" + userID + "-" + Math.random()
  return dispatch => {
    dispatch(fetchUserBidsRequested(opID))
    return basePost(`/reporting/userBiddings`, {userID})
      .then(response =>
        response.text().then(msg => dispatch(fetchUserBidsCompleted(opID, msg)))
      ).catch(v1 => console.log(opID + ": " + v1))
  }
}

const deleteBidRequested = (opID) => ({ opID: opID, type: DELETE_BID_REQUESTED })
const deleteBidCompleted = (opID, msg) => ({ opID: opID, type: DELETE_BID_COMPLETED, msg: msg })

export function deleteBid(bidID, slot, userID) {
  let opID = "deleteBid-" + bidID + "-" + Math.random()
  return dispatch => {
    dispatch(deleteBidRequested(opID))
    return basePost(`/areyousure/deleteBid`, {bidID, slot})
      .then(response =>
        response
          .text()
          .then(msg => dispatch(deleteBidCompleted(opID, msg)))
          .then(() => dispatch(fetchAllUsers()))
          .then(() => dispatch(fetchUserBids(userID)))
      ).catch(v1 => console.log(opID + ": " + v1))
  }
}

function basePost(apiPath, data) {
  let toSend = JSON.stringify(data)
  return fetch(apiPath, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: toSend})
}