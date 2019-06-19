import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TopBar from './components/TopBar'
import NodeInfo from './components/NodeInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import { composeAPI } from '@iota/core'
import { defaultRSX } from './config/defaultVariables'

import LastTransactions from './components/LastTransactions'
import AccountData from './components/AccountData'
import IssueTransaction from './components/IssueTransaction'
import NodeNeighbours from './components/NodeNeighbours'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			RSX01: defaultRSX,
			RSX02: defaultRSX,
			RSX03: defaultRSX
		}
		this.fetchNodes = this.fetchNodes.bind(this)
	}

	async fetchNodes() {
		;[1, 2, 3].forEach(async node => {
			let iota = composeAPI({
				provider: `http://192.168.33.10${node}:14265`
			})
			try {
				let nodeInfo = await iota.getNodeInfo()
				this.setState({ [`RSX0${node}`]: { ...nodeInfo, state: true } })
			} catch (e) {
				this.setState({ [`RSX0${node}`]: defaultRSX })
			}
		})
	}
	render() {
		return (
			<div className="App">
				<TopBar
					address={
						'YUEBFBJYMVROZT9UYPHSHZDFPTPSEHUOVZCDJVXMCEBQXAJMKICYUMGWOJTALRCXMGBDZAIVUEJJQYVKT'
					}
				/>
				<div className="nodes-infos">
					<NodeInfo nodeId={1} info={this.state.RSX01} />
					<NodeInfo nodeId={2} info={this.state.RSX02} />
					<NodeInfo nodeId={3} info={this.state.RSX03} />
					<div className="update" onClick={() => this.fetchNodes()}>
						<FontAwesomeIcon icon={faSyncAlt} />
						<p>UPDATE</p>
					</div>
				</div>
				<div className="main-display">
					<ul
						className="nav nav-pills mb-3 justify-content-center"
						id="pills-tab"
						role="tablist"
					>
						<li className="nav-item">
							<a
								className="nav-link active"
								id="pills-home-tab"
								data-toggle="pill"
								href="#pills-home"
								role="tab"
								aria-controls="pills-home"
								aria-selected="true"
							>
								Last Transactions
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								id="pills-profile-tab"
								data-toggle="pill"
								href="#pills-profile"
								role="tab"
								aria-controls="pills-profile"
								aria-selected="false"
							>
								Account Data
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								id="pills-contact-tab"
								data-toggle="pill"
								href="#pills-contact"
								role="tab"
								aria-controls="pills-contact"
								aria-selected="false"
							>
								Issue Transaction
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								id="pills-contact-tab"
								data-toggle="pill"
								href="#pills-contact2"
								role="tab"
								aria-controls="pills-contact"
								aria-selected="false"
							>
								Node Neighbours
							</a>
						</li>
					</ul>
					<hr />
					<div className="tab-content" id="pills-tabContent">
						<div
							className="tab-pane fade show active"
							id="pills-home"
							role="tabpanel"
							aria-labelledby="pills-home-tab"
						>
							<LastTransactions />
						</div>
						<div
							className="tab-pane fade"
							id="pills-profile"
							role="tabpanel"
							aria-labelledby="pills-profile-tab"
						>
							<AccountData />
						</div>
						<div
							className="tab-pane fade"
							id="pills-contact"
							role="tabpanel"
							aria-labelledby="pills-contact-tab"
						>
							<IssueTransaction />
						</div>
						<div
							className="tab-pane fade"
							id="pills-contact2"
							role="tabpanel"
							aria-labelledby="pills-contact-tab"
						>
							<NodeNeighbours />
						</div>
					</div>
				</div>
				<div className="footer"></div>
			</div>
		)
	}
}

export default App
