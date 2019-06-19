import React, { Component } from 'react'
import { composeAPI } from '@iota/core'
import _ from 'lodash'
const converter = require('@iota/converter')

export default class IssueTransaction extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedNode: 1,
			address: '',
			seed: '',
			message: '',
			bundle: '',
			error: ''
		}
		this.issueTransaction = this.issueTransaction.bind(this)
		this.handleAddressChange = this.handleAddressChange.bind(this)
		this.handleSeedChange = this.handleSeedChange.bind(this)
		this.handleMessageChange = this.handleMessageChange.bind(this)
		this.cleanFields = this.cleanFields.bind(this)
	}

	handleAddressChange(e) {
		this.setState({ address: e.target.value })
	}

	handleSeedChange(e) {
		this.setState({ seed: e.target.value })
	}

	handleMessageChange(e) {
		this.setState({ message: e.target.value })
	}

	cleanFields() {
		this.setState({
			address: '',
			seed: '',
			message: '',
			bundle: '',
			error: ''
		})
	}

	issueTransaction() {
		let iota = composeAPI({
			provider: `http://192.168.33.10${this.state.selectedNode}:14265`
		})
		const message = converter.asciiToTrytes(this.state.message)
		const transfers = [
			{
				value: 0,
				address: this.state.address,
				message: message
			}
		]
		iota.prepareTransfers(this.state.seed, transfers)
			.then(trytes => iota.sendTrytes(trytes, 3, 9))
			.then(bundle => {
				this.setState({ bundle: bundle })
			})
			.catch(err => {
				this.setState({ error: err })
			})
	}

	render() {
		return (
			<div className="last-transactions-main-containerr">
				<div className="submit-last-transactions input-message">
					<label htmlFor="exampleInputEmail1">Message</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						placeholder="MESSAGE"
						value={this.state.message}
						onChange={this.handleMessageChange}
					/>
				</div>
				<div className="submit-last-transactions input-message">
					<label htmlFor="exampleInputEmail1">Seed</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail3"
						placeholder="SENDER SEED"
						value={this.state.seed}
						onChange={this.handleSeedChange}
					/>
				</div>
				<div className="submit-last-transactions">
					<label htmlFor="exampleInputEmail1">Address</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail2"
						placeholder="DESTINATION ADDRESS"
						value={this.state.address}
						onChange={this.handleAddressChange}
					/>
				</div>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() =>
						this.setState({
							seed:
								'SEED99999999999999999999999999999999999999999999999999999999999999999999999999999'
						})
					}
				>
					SEED
				</button>
				<button
					type="button"
					className="btn btn-outline-secondary seed-finish"
					onClick={() =>
						this.setState({
							seed:
								'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'
						})
					}
				>
					RANDOM SEED
				</button>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() =>
						this.setState({
							address:
								'LOREMOORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLAA'
						})
					}
				>
					AA
				</button>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() =>
						this.setState({
							address:
								'LOREMOORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLAB'
						})
					}
				>
					AB
				</button>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() =>
						this.setState({
							address:
								'LOREMOORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLAC'
						})
					}
				>
					AC
				</button>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() =>
						this.setState({
							address:
								'LOREMOORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLAD'
						})
					}
				>
					AD
				</button>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() =>
						this.setState({
							address:
								'LOREMOORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLAE'
						})
					}
				>
					AE
				</button>
				<div className="btn-group select-node-issue-transaction">
					<button
						type="button"
						className="btn btn-primary dropdown-toggle"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						RSX0{this.state.selectedNode}
					</button>
					<div className="dropdown-menu">
						<a
							className="dropdown-item"
							onClick={() => this.setState({ selectedNode: 1 })}
						>
							RSX01
						</a>
						<a className="dropdown-item disabled">RSX02</a>
						<a
							className="dropdown-item"
							onClick={() => this.setState({ selectedNode: 3 })}
						>
							RSX03
						</a>
					</div>
				</div>
				<button
					className="btn btn-outline-success btn-issue-transaction"
					onClick={() => this.issueTransaction()}
				>
					Issue Transaction
				</button>
				<button
					className="btn btn-outline-danger btn-issue-transaction"
					onClick={() => this.cleanFields()}
				>
					CLEAR
				</button>
				{_.isEmpty(this.state.bundle) ? (
					_.isEmpty(this.state.error) ? (
						<div className="terminal-green">$terminal output :</div>
					) : (
						<div className="terminal-red">
							{JSON.stringify(this.state.error, 0, 4)}
						</div>
					)
				) : (
					<div className="terminal-green">
						{JSON.stringify(this.state.bundle, 0, 4)}
					</div>
				)}
			</div>
		)
	}
}
