import React, { Component } from 'react'

export default class SubmitForm extends Component {
	componentDidMount() {
		this.connection = new WebSocket('ws://localhost:3000/ws/submit')
		this.connection.onerror = function (error) {
			console.log('WebSocket Error ' + error);
		};
	}

	render() {
		let slot, amt

		return (
			<div>
			<form
			onSubmit={e => {
				e.preventDefault()
				if (!slot.value.trim() || !amt.value.trim()) {
					return
				}

				var data = {
					slot: slot.value,
					amt: amt.value
				}
				this.connection.send(JSON.stringify(data))

				slot.value = ''
				amt.value = ''
			}}
			>
			<label>Slot</label>
			<input
			ref={node => {
				slot = node
			}}
			/>
			<br/>

			<label>Bid Amount</label>
			<input
			ref={node => {
				amt = node
			}}
			/>
			<br/>					

			<button type="submit">
			Send Bid
			</button>
			</form>
			</div>
			)
	}
}