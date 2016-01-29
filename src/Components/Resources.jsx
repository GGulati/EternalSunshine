var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

var Actions = require('../Actions/actions.js');
var GameModel = require('../gameModel.js');

const Resource = props => {
	let displayName = GameModel.GameDefinition.getIn(['resources', props.name, 'name']);
	let displaySuffix = GameModel.GameDefinition.getIn(['resources', props.name, 'suffix']);

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
					([name, qty]) =>
						<Resource key={name} name={name} qty={qty} />
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