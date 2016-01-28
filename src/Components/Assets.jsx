var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

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

const AssetsContainer = props => {
	const { dispatch, assets } = props;

	return (
		<div className="es-assets">
			<h3>Assets <small>Placeholder</small></h3>
			{
				assets.entrySeq().map(
					entry => <Asset key={entry[0]} name={entry[0]} qty={entry[1]} />
				).toJS()
			}
		</div>
	);
};

const transformer = state => {
	return { assets: state.gamestate.get('assets') };
};
export const Assets = RR.connect(transformer)(AssetsContainer);