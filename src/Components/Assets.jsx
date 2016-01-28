var React = require('react');
var ReactDOM = require('react-dom');

var RBS = require('react-bootstrap');

var Actions = require('../Actions/actions.js');

import { gameDefinition } from '../gameDefinition.js';

const Asset = props => {
	let displayName = gameDefinition.getIn(['assets', props.name, 'name']);
	let displaySuffix = gameDefinition.getIn(['assets', props.name, 'suffix']);

	return (
		<div className="es-asset">
			<h4>{displayName}{displaySuffix} <small>{props.qty}</small></h4>
		</div>
	);
};

export const AssetsRenderer = props => {
	const { dispatch, gamestate } = props;

	return (
		<div className="es-assets">
			<h3>Assets <small>Placeholder</small></h3>
			{
				gamestate.get('assets').entrySeq().map(
					entry => <Asset key={entry[0]} name={entry[0]} qty={entry[1]} />
				).toJS()
			}
		</div>
	);
};