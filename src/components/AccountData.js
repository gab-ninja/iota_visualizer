import React, { Component } from 'react'
import { composeAPI } from '@iota/core'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

const converter = require('@iota/converter')

export default class AccountData extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedNode: 1,
			seed: '',
			accountData: {}
		}
		this.fetchHash = this.fetchHash.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.renderInfo = this.renderInfo.bind(this)
		this.renderInputs = this.renderInputs.bind(this)
	}

	handleChange(e) {
		this.setState({ seed: e.target.value })
	}

	async fetchHash() {
		let iota = composeAPI({
			provider: `http://192.168.33.10${this.state.selectedNode}:14265`
		})
		const accData = await iota.getAccountData(this.state.seed, {
			start: 0,
			security: 2
		})
		this.setState({ accountData: accData })
	}

	renderInfo() {
		if (_.isEmpty(this.state.accountData)) {
			return (
				<div>
					<h6>Desole :(</h6>
					<p>No account found</p>
				</div>
			)
		} else {
			const { accountData } = this.state
			return (
				<div className="account-info">
					<h4>
						<FontAwesomeIcon
							icon={faWallet}
							className="wallet-icon"
						/>
						{accountData.balance} IOTAs
					</h4>
					<p>
						<strong>Latest address: </strong>
						{accountData.latestAddress}
					</p>
					{this.renderInputs()}
				</div>
			)
		}
	}

	renderInputs() {
		return this.state.accountData.inputs.map(e => (
			<div>
				<hr />
				<p>
					<strong>Address: </strong>
					{e.address}
				</p>
				<div className="account-input">
					<p>
						<strong>Balance: </strong>
						{e.balance} IOTAs
					</p>
					<p>
						<strong>Key index: </strong>
						{e.keyIndex}
					</p>
					<p>
						<strong>Security: </strong>
						{e.security}
					</p>
				</div>
			</div>
		))
	}

	render() {
		return (
			<div className="last-transactions-main-containerr">
				<div className="submit-last-transactions">
					<label htmlFor="exampleInputEmail1">Account seed</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						placeholder="SEED"
						value={this.state.seed}
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
							seed:
								'SEED99999999999999999999999999999999999999999999999999999999999999999999999999999'
						})
					}
				>
					SEED
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

				{this.renderInfo()}
			</div>
		)
	}
}
