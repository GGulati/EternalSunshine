/* action constants */

export const Actions = {
	TICK: 'GAME_TICK',
	GATHER_RESOURCES: 'GAME_GATHER_RESOURCES',
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

export function tickTimer() {
	return {
		type: Actions.TICK,
		gametime: gametime++,
	};
}