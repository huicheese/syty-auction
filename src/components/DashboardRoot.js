import React from 'react'
import DashboardSlotBoxContainer from '../containers/DashboardSlotBoxContainer'

class Dashboard extends React.Component {

  	componentDidMount() {
    	this.props.actions.initializeConnection();
  	}

	render() {
		return (
			<div className="container dashboard">
				<div className="c8 row">
					<DashboardSlotBoxContainer />
				</div>

			</div>
			)
	}
}

export default Dashboard