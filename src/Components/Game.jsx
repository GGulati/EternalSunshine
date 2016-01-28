var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var TimerMixin = require('react-timer-mixin');
var RR = require('react-redux');

var Resources = require('./Resources.jsx');
var Assets = require('./Assets.jsx');
var Upgrades = require('./Upgrades.jsx');
var Achievements = require('./Achievements.jsx');

var Actions = require('../Actions/actions.js');

import { TICK_INTERVAL } from '../gameDefinition.js';

const Game = React.createClass({
	mixins: [TimerMixin],

	componentDidMount: function() {
		this.setInterval(() => this.props.dispatch(Actions.tickTimer()), TICK_INTERVAL);
	},

	render: function() {
		const { dispatch, gamestate } = this.props;
		return (
		  <div className="es-game">
		  	<RBS.Panel>
		    	<Resources.ResourcesRenderer gamestate={gamestate} dispatch={dispatch} />
				</RBS.Panel>
		  	<RBS.Tabs position="left" tabWidth={3}>
			    <RBS.Tab eventKey={1} title="Illuminators">
			    	<RBS.Panel>
			    		<Assets.AssetsRenderer gamestate={gamestate} dispatch={dispatch} />
		    		</RBS.Panel>
			    </RBS.Tab>
			    <RBS.Tab eventKey={2} title="Upgrades">
			    	<RBS.Panel>
			   	 		<Upgrades.UpgradesRenderer gamestate={gamestate} dispatch={dispatch} />
		    		</RBS.Panel>
			    </RBS.Tab>
			    <RBS.Tab eventKey={3} title="Achievements">
			    	<RBS.Panel>
			   	 		<Achievements.AchievementsRenderer gamestate={gamestate} dispatch={dispatch} />
		    		</RBS.Panel>
			    </RBS.Tab>
		  	</RBS.Tabs>
		  </div>
	  );
	},
});

export const ConnectedGame = RR.connect(x => x)(Game);