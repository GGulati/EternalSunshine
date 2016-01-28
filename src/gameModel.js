var Immutable = require('Immutable');

const TICKS_PER_SECOND = 1;
export const TICK_INTERVAL = 1000 / TICKS_PER_SECOND;

export const GameDefinition = Immutable.fromJS({
	gather_resources: {
		productivity: {
			lumens: 1,
		},
	},

	asset_sell_ratio: 0.5,

	resources: {
		lumens: {
			name: 'Lumen',
			suffix: 's',
		},
		shadows: {
			name: 'Shadow',
			suffix: 's',
		},
	},

	assets: {
		candles: {
			name: 'Candle',
			suffix: 's',
			productivity: {
				lumens: 1,
				shadows: 1,
			},
			cost: {
				lumens: 10,
			}
		},
		nightcandles: {
			name: 'Nightcandle',
			suffix: 's',
			productivity: {
				lumens: 1,
				shadows: 2,
			},
			cost: {
				lumens: 5,
				shadows: 10,
			}
		},
	},
});

export const StartingGamestate = Immutable.fromJS({
	actionId: 0,
	gametime: 0,
	resources: {
		lumens: 0,
		shadows: 0,
	},
	assets: {
		candles: 0,
		nightcandles: 0,
	},
	upgrades: {

	},
	achievements: {

	},
	messages: [],
});

function replaceAll(str, context){
	var context_match = context.mapKeys(k => '{' + k.toLowerCase() + '}');
  var re = new RegExp(context_match.keySeq().join("|"), "gi");

  return str.replace(re, function(matched){
    return context_match.get(matched.toLowerCase());
  });
}

export const MessageType = {
	NEED_RES: "MESSAGE_NEED_RES",
	NEED_ASSET: "MESSAGE_NEED_ASSET",
}

const MessageContent = Immutable.Map([
	[MessageType.NEED_RES, "You cannot buy a {displayName} until you have {resourceDelta}"],
	[MessageType.NEED_ASSET, "You do not have any {displayName}{displaySuffix} to sell"]
]);

const MessageStyle = Immutable.Map([
	[MessageType.NEED_RES, "danger"],
	[MessageType.NEED_ASSET, "danger"]
]);

export const resourcesToString = (cost, adj=null) => {
	const formatReqs = (qty, name) => {
		const displayName = GameDefinition.getIn(['resources', name, 'name']);
		const displaySuffix = GameDefinition.getIn(['resources', name, 'suffix']);

		return qty + (!!adj ? " " + adj + " " : " ") + displayName + (qty != 1 ? displaySuffix : "");
	}

	const reqs = cost.map(formatReqs);

	if (reqs.size > 1) {
		const comma_part = reqs.slice(0, -1).join(', ');
		const final_part = reqs.slice(-1).join();
		return comma_part + " and " + final_part;
	} else {
		return reqs.first(); // AKA only element
	}
}

const createMessage = (type, context, details, duration=5) => Immutable.Map({
	type: type,
	style: MessageStyle.get(type),
	context: context,
	details: details,
	text: replaceAll(MessageContent.get(type), context.merge(details)),
	duration: duration,
});

const canPostMessage = (messages, type, context) => {
	if (messages.isEmpty()) {
		return true;
	}

	const recent = messages.first();
	const sameType = recent.get('type') === type;
	const sameContext = recent.get('context').isSuperset(context);
	return !(sameType && sameContext);
}

export const tryAddMessage = (messages, type, context, details) => {
	if (canPostMessage(messages, type, context)) {
		return messages.push(createMessage(type, context, details));
	} else {
		return messages;
	}
};