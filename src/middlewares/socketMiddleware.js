import io from 'socket.io-client'
import * as actions from '../actions'

export const WS_CONNECT = 'WS_CONNECT'
export const WS_DISCONNECT = 'WS_DISCONNECT'
export const WS_RECEIVE_MESSAGE = 'WS_RECEIVE_MESSAGE'
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE'

const socketMiddleware = (function(){
  var wsUrl = location.origin.replace(/^http/, 'ws');
  var socket = null;

  const createSocket = (store) => {
    socket = io(wsUrl);

    socket.on('connect', () => {
      store.dispatch(actions.connected());
    });

    socket.on('disconnect', () => {
      store.dispatch(actions.disconnected());
    });

    socket.on('data', (data) => {
      var msg = JSON.parse(data);
      if (msg.events || msg.slots)
          store.dispatch(actions.messageReceived(msg));
      else
          console.log("Received unknown message type: '" + msg.type + "'");
    });
  }

  return store => next => action => {
    switch(action.type) {

      //The user wants us to connect
      case WS_CONNECT:
        //Start a new connection to the server
        if (socket != null) {
          socket.close();
        }

        //Send an action that shows a "connecting..." status for now
        store.dispatch(actions.connecting());

        socket = createSocket(store);
        break;

      //The user wants us to disconnect
      case WS_DISCONNECT:
        if(socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        store.dispatch(actions.disconnected());
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case WS_SEND_MESSAGE:
        socket.emit('message', JSON.stringify(action));
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware