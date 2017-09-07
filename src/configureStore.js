import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import socketMiddleware from './middlewares/socketMiddleware'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(
			socketMiddleware,
			thunkMiddleware
      // , createLogger()
			)
		)
}