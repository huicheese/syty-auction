import React from 'react'
import SummaryReportContainer from '../containers/SummaryReportContainer'

class SummaryReport extends React.Component {

  	componentDidMount() {
    	this.props.actions.initializeConnection();
  	}

	render() {
		return (<SummaryReportContainer />)
	}
}

export default SummaryReport