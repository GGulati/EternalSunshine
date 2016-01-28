var Immutable = require('Immutable');
var Redux = require('redux');

import { Actions } from '../Actions/actions.js';
import { startingGamestate, gameDefinition } from '../gameDefinition.js';

function gamestateReducer(state = startingGamestate, action) {
	switch (action.type) {
		case Actions.GATHER_RESOURCES: {
			let updated = state.set('actionId', action.actionId);
			var res = updated.get('resources');

			let production = gameDefinition.getIn(['gather_resources', 'productivity']);
			res = res.mergeDeepWith((a, b) => a + b, production);

			return updated.set('resources', res);
		}
		case Actions.TICK: {
			let updated = state.set('gametime', action.gametime);
			var res = updated.get('resources');

			state.get('assets').forEach((value, key) => {
				let prod = gameDefinition.getIn(['assets', key, 'productivity']);
				let qty = state.getIn(['assets', key]);
				let production = prod.map(x => x * qty);

				res = res.mergeDeepWith((a, b) => a + b, production);
			});

			return updated.set('resources', res);
		}
		default: {
			console.log("Unknown game action type: " + action.type);
			return state;
		}
	}
}

export const masterReducer = Redux.combineReducers({
	gamestate: gamestateReducer,
});