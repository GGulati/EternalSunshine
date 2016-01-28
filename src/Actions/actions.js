/* action constants */

export const Actions = {
	TICK: 'GAME_TICK',
	GATHER_RESOURCES: 'GAME_GATHER_RESOURCES',
	BUY_ASSET: 'GAME_ASSET_BUY',
	SELL_ASSET: 'GAME_ASSET_SELL',
};

/* action creators */

let actionId = 0;
let gametime = 0;

export function gatherResources() {
	return {
		type: Actions.GATHER_RESOURCES,
		actionId: actionId++,
	};
}

export function buyAsset(assetName) {
	return {
		type: Actions.BUY_ASSET,
		actionId: actionId++,
		assetName: assetName,
	};
}

export function sellAsset(assetName) {
	return {
		type: Actions.SELL_ASSET,
		actionId: actionId++,
		assetName: assetName,
	};
}

export function tickTimer() {
	return {
		type: Actions.TICK,
		gametime: gametime++,
	};
}