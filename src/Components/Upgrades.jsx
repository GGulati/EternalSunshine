var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

var Actions = require('../Actions/actions.js');

import { gameDefinition } from '../gameDefinition.js';

const UpgradesContainer = props => {
	const { dispatch, upgrades } = props;

	return (
		<div className="es-upgrades">
			<h3>Upgrades <small>Placeholder</small></h3>
		</div>
	);
};

const transformer = state => {
	return { upgrades: state.gamestate.get('upgrades') };
};
export const Upgrades = RR.connect(transformer)(UpgradesContainer);