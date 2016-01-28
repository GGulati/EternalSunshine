var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

var Actions = require('../Actions/actions.js');

import { gameDefinition } from '../gameDefinition.js';

const Resource = props => {
	let displayName = gameDefinition.getIn(['resources', props.name, 'name']);
	let displaySuffix = gameDefinition.getIn(['resources', props.name, 'suffix']);

	return (
		<div>{props.qty} {displayName + (props.qty != 1 ? displaySuffix : '')}</div>
	);
};

const ResourcesContainer = props => {
	const { dispatch, resources } = props;

	return (
		<div className="es-resources">
			<h3>Resources <small>shining, shimmering, splendid</small></h3>
			{
				resources.entrySeq().map(
					entry => <Resource key={entry[0]} name={entry[0]} qty={entry[1]} />
				).toJS()
			}
			<RBS.Button className="btn-raised" onClick={() => dispatch(Actions.gatherResources())}>Flicker</RBS.Button>
		</div>
	);
};

let transformer = state => {
	return { resources: state.gamestate.get('resources') };
};
export const Resources = RR.connect(transformer)(ResourcesContainer);