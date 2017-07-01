import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import SubmitForm from './SubmitForm'

const store = configureStore()

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Route exact path="/" component={SubmitForm} />
						<Route exact path="/view" component={AsyncApp} />
					</div>
				</Router>
			</Provider>
			)
	}
}