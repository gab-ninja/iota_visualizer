import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons'

export default function NodeInfo(props) {
	const { info, nodeId } = props
	return (
		<div className="node-card">
			<div className="node-card-first-line">
				<h6>
					<FontAwesomeIcon icon={faServer} size="2x" />
					<span className="node-id">RSX0{nodeId}</span>
				</h6>
				<div className="status-section">
					<p>STATUS</p>
					{info.state ? (
						<div className="status-box-green">
							<span>UP</span>
						</div>
					) : (
						<div className="status-box-red">
							<span>DOWN</span>
						</div>
					)}
				</div>
			</div>
			<hr />
			<p>
				<strong>Version:</strong> {info.appVersion}
			</p>
			<p>
				<strong>JRE max memory: </strong>
				{info.jreMaxMemory / 1024 / 1024 / 1024}Gb
			</p>
			<p>
				<strong>Latest milestone index: </strong>
				{info.latestMilestoneIndex}
			</p>
			<p>
				<strong>#Neighbours: </strong>
				{info.neighbors}
			</p>
			<p>
				<strong>#Tips: </strong>
				{info.tips}
			</p>
		</div>
	)
}
