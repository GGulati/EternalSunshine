var Immutable = require('Immutable');
var Redux = require('redux');

import { Actions } from '../Actions/actions.js';
var GameModel = require('../gameModel.js');

const tick = (state, action) => {
	const updated = state.set('gametime', action.gametime);
	var res = updated.get('resources');

	// for each asset, produce its production * n, where n is the quantity of that asset
	state.get('assets').forEach((value, key) => {
		const prod = GameModel.GameDefinition.getIn(['assets', key, 'productivity']);
		const qty = state.getIn(['assets', key]);
		const production = prod.map(x => x * qty);

		res = res.mergeDeepWith((a, b) => a + b, production);
	});

	return updated
		.set('resources', res)
		.updateIn(['messages'],
			messages =>
				messages
					.map(msg => msg.updateIn(['duration'], t => t - 1))
					.filter(msg => msg.get('duration') > 0)
		);
};

const gatherResources = (state, action) => {
	const updated = state.set('actionId', action.actionId);
	var res = updated.get('resources');

	const production = GameModel.GameDefinition.getIn(['gather_resources', 'productivity']);
	res = res.mergeDeepWith((a, b) => a + b, production);

	return updated.set('resources', res);
};

const buyAsset = (state, action) => {
	const updated = state.set('actionId', action.actionId);
	var res = updated.get('resources');
	
	// check if we have enough resources
	const cost = GameModel.GameDefinition.getIn(['assets', action.assetName, 'cost']);
	const satisfies = cost.map((qty, resName) => res.get(resName) >= qty, cost);

	if (satisfies.every(x => !!x)) { // can afford
		res = res.mergeDeepWith((inv, cost) => inv - cost, cost);
		
		return updated
			.set('resources', res)
			.updateIn(['assets', action.assetName], x => x + 1);
	} else {
		const displayName = GameModel.GameDefinition.getIn(['assets', action.assetName, 'name']);
		const displaySuffix = GameModel.GameDefinition.getIn(['assets', action.assetName, 'suffix']);

		const needed_res = cost
			.mergeDeepWith((a, b) => a - b, res)
			.filter(x => x > 0);

		return updated
			.updateIn(['messages'],
				messages =>
					GameModel.tryAddMessage(
						messages,
						GameModel.MessageType.NEED_RES,
						Immutable.fromJS({
							assetName: action.assetName,
						}),
						Immutable.fromJS({
							displayName: displayName,
							displaySuffix: displaySuffix,
							resourceDelta: GameModel.resourcesToString(needed_res, "more"),
						})
					)
			);
	}
}

const sellAsset = (state, action) => {
	const updated = state.set('actionId', action.actionId);
	
	// check that we have an asset of that type to sell
	if (updated.getIn(['assets', action.assetName]) > 0) {
		var res = updated.get('resources');

		const cost = GameModel.GameDefinition.getIn(['assets', action.assetName, 'cost']);
		const refunded = cost.map(x => Math.floor(x * GameModel.GameDefinition.get('asset_sell_ratio')));

		res = res.mergeDeepWith((a, b) => a + b, refunded);
		return updated
			.set('resources', res)
			.updateIn(['assets', action.assetName], x => x - 1);
	} else {
		const displayName = GameModel.GameDefinition.getIn(['assets', action.assetName, 'name']);
		const displaySuffix = GameModel.GameDefinition.getIn(['assets', action.assetName, 'suffix']);

		return updated
			.updateIn(['messages'],
				messages =>
					GameModel.tryAddMessage(
						messages,
						GameModel.MessageType.NEED_ASSET,
						Immutable.fromJS({
							assetName: action.assetName,
						}),
						Immutable.fromJS({
							displayName: displayName,
							displaySuffix: displaySuffix,
						})
					)
			);
	}
};

function gamestateReducer(state = GameModel.StartingGamestate, action) {
	switch (action.type) {
		case Actions.TICK:
			return tick(state, action);
		case Actions.GATHER_RESOURCES:
			return gatherResources(state, action);
		case Actions.BUY_ASSET:
			return buyAsset(state, action);
		case Actions.SELL_ASSET:
			return sellAsset(state, action);
		default: {
			console.log("Unknown game action type: " + action.type);
			return state;
		}
	}
}

export const masterReducer = Redux.combineReducers({
	gamestate: gamestateReducer,
});