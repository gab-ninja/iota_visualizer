import React, { Component } from 'react'
import { composeAPI } from '@iota/core'
const converter = require('@iota/converter')

export default class LastTransactions extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedNode: 1,
			hash: '',
			transactions: []
		}
		this.fetchHash = this.fetchHash.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.renderTransactions = this.renderTransactions.bind(this)
	}

	handleChange(e) {
		this.setState({ hash: e.target.value })
	}

	async fetchHash() {
		console.log('Fetch transactions')
		let iota = composeAPI({
			provider: `http://192.168.33.10${this.state.selectedNode}:14265`
		})
		let transactions = await iota.findTransactionObjects({
			addresses: [this.state.hash]
		})
		for (let i = 0; i < transactions.length; i++) {
			let tx = transactions[i]
			const states = await iota.getLatestInclusion([tx.hash])
			tx.status = states[0]
			tx.key = tx.hash
		}

		console.log(transactions)
		this.setState({
			transactions: transactions.sort((a, b) =>
				a.timestamp > b.timestamp ? 1 : -1
			)
		})
		console.log('Fetched')
	}

	renderTransactions() {
		console.log(this.state)
		return this.state.transactions.map((tx, i) => (
			<tr>
				<th scope="row">{i}</th>
				<td>
					{new Date(tx.timestamp * 1000)
						.toISOString()
						.slice(0, 19)
						.replace('T', ' ')}
				</td>
				<td>
					{converter.trytesToAscii(
						tx.signatureMessageFragment.slice(0, -1)
					)}
				</td>
				<td>
					{tx.status ? (
						<div className="tx-confirmed">
							<p>CONFIRMED</p>
						</div>
					) : (
						<div className="tx-not-confirmed">
							<p>NOT CONFIRMED</p>
						</div>
					)}
				</td>
			</tr>
		))
	}

	renderBody() {
		if (this.state.transactions.length === 0) {
			return (
				<div>
					<h6>Desole :(</h6>
					<p>No transactions found</p>
				</div>
			)
		}
		return (
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Timestamp</th>
						<th scope="col">Message</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>{this.renderTransactions()}</tbody>
			</table>
		)
	}

	render() {
		return (
			<div className="last-transactions-main-containerr">
				<div className="submit-last-transactions">
					<label htmlFor="exampleInputEmail1">Transaction hash</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						placeholder="HASH"
						value={this.state.hash}
						onChange={this.handleChange}
					/>
					<button
						className="btn btn-primary"
						onClick={() => this.fetchHash()}
					>
						Search
					</button>
				</div>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() =>
						this.setState({
							hash:
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
							hash:
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
							hash:
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
							hash:
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
							hash:
								'LOREMOORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLAE'
						})
					}
				>
					AE
				</button>
				<div className="btn-group select-node">
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
				{this.renderBody()}
			</div>
		)
	}
}
