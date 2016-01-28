var Immutable = require('Immutable');

const TICKS_PER_SECOND = 1;
export const TICK_INTERVAL = 1000 / TICKS_PER_SECOND;

export const gameDefinition = Immutable.fromJS({
	resources: {
		lumens: {
			name: 'Lumen',
			suffix: 's',
		},
		gravity: {
			name: 'Gravity',
			suffix: '',
		},
	},
	gather_resources: {
		productivity: {
			lumens: 1,
		},
	},
	assets: {
		candles: {
			name: 'Candle',
			suffix: 's',
			productivity: {
				lumens: 1,
			},
		},
		stars: {
			name: 'Star',
			suffix: 's',
			productivity: {
				lumens: 6840000000000000000000000000,
				gravity: 10,
			},
		},
	},
});

export const startingGamestate = Immutable.fromJS({
	actionId: 0,
	gametime: 0,
	resources: {
		lumens: 0,
		gravity: 0,
	},
	assets: {
		candles: 1,
		stars: 0,
	},
	upgrades: {

	},
	achievements: {

	},
});