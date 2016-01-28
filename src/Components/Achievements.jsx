var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

var Actions = require('../Actions/actions.js');
var GameModel = require('../gameModel.js');

const AchievementsContainer = props => {
	const { dispatch, achievements } = props;

	return (
		<div className="es-achievements">
			<h3>Achievements <small>Placeholder</small></h3>
		</div>
	);
};

const transformer = state => {
	return { achievements: state.gamestate.get('achievements') };
};
export const Achievements = RR.connect(transformer)(AchievementsContainer);