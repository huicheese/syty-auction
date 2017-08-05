import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import configureStore from '../configureStore'
import DashboardRootContainer from './DashboardRootContainer'
import AdminBidRootContainer from './AdminBidRootContainer'

const store = configureStore()

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Route exact path="/" component={DashboardRootContainer} />
						<Route exact path="/adminBid" component={AdminBidRootContainer} />
					</div>
				</Router>
			</Provider>
			)
	}
}