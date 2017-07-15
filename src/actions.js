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
    msg:msg
  }
}








export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}