var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

var Actions = require('../Actions/actions.js');
var GameModel = require('../gameModel.js');

const Asset = props => {
	const displayName = GameModel.GameDefinition.getIn(['assets', props.name, 'name']);
	const displaySuffix = GameModel.GameDefinition.getIn(['assets', props.name, 'suffix']);

	const cost = GameModel.GameDefinition.getIn(['assets', props.name, 'cost']);
	const cost_displayed = GameModel.resourcesToString(cost);

	const refund_ratio = GameModel.GameDefinition.get('asset_sell_ratio');
	const refunds = cost.map(x => Math.floor(x * refund_ratio));
	const refund_displayed = Math.floor(refund_ratio * 100) + "% (" + GameModel.resourcesToString(refunds) + ")";

	const productivity = GameModel.GameDefinition.getIn(['assets', props.name, 'productivity']);
	const productivity_displayed = GameModel.resourcesToString(productivity);

	const title = <h4>{displayName}{displaySuffix}: <small>{props.qty}</small></h4>;

	return (
		<RBS.Panel className="es-asset" header={title}>
			<p>
				Produces: {productivity_displayed} per sec
			</p>
			<p>
				<RBS.Button className="btn-raised" bsStyle="success" onClick={props.onBuy}>
					<RBS.Glyphicon glyph="plus" /> Buy
				</RBS.Button>
				Cost: {cost_displayed}
			</p>
			<p>
				<RBS.Button className="btn-raised" bsStyle="danger" onClick={props.onSell}>
					<RBS.Glyphicon glyph="minus" /> Sell
				</RBS.Button>
				Refunds: {refund_displayed}
			</p>
		</RBS.Panel>
	);
};

const AssetsContainer = props => {
	const { dispatch, assets } = props;

	return (
		<div className="es-assets">
			<h3>Assets <small>Placeholder</small></h3>
			{
				assets.entrySeq().map(
					entry =>
						<Asset
							key={entry[0]}
							name={entry[0]}
							qty={entry[1]}
							onBuy={() => { dispatch(Actions.buyAsset(entry[0])) }}
							onSell={() => { dispatch(Actions.sellAsset(entry[0])) }}
						/>
				).toJS()
			}
		</div>
	);
};

const transformer = state => {
	return { assets: state.gamestate.get('assets') };
};
export const Assets = RR.connect(transformer)(AssetsContainer);