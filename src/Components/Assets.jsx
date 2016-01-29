var Immutable = require('Immutable');
var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

var Actions = require('../Actions/actions.js');
var GameModel = require('../gameModel.js');

const PriceButtonType = {
	BUY: 'PRICE_BUTTON_BUY',
	SELL: 'PRICE_BUTTON_SELL',
};

const PriceButtonTypeLookup = Immutable.Map([
	[PriceButtonType.BUY, {
		bsStyle: 'success',
		glyph: 'plus',
		text: 'Buy',
		tooltip: 'Costs',
	}],
	[PriceButtonType.SELL, {
		bsStyle: 'danger',
		glyph: 'minus',
		text: 'Sell',
		tooltip: 'Refunds',
	}],
]);

const PriceButton = props => {
	const type_details = PriceButtonTypeLookup.get(props.pbType);
	var total_price = GameModel.calcAssetCost(props.name, props.qty);

	if (props.pbType == PriceButtonType.SELL) {
		const refund_ratio = GameModel.GameDefinition.get('asset_sell_ratio');
		total_price = total_price.map(x => Math.floor(x * refund_ratio));
	}

	const price_displayed = GameModel.resourcesToString(total_price);

	const tooltip = <RBS.Tooltip><strong>{type_details.tooltip}</strong> {price_displayed}</RBS.Tooltip>;

	return (
		<RBS.OverlayTrigger placement="left" overlay={tooltip}>
	    <RBS.Button className="btn-raised" bsStyle={type_details.bsStyle} onClick={() => props.onClick(props.qty)}>
				<RBS.Glyphicon glyph={type_details.glyph} /> {type_details.text} {props.qty}
			</RBS.Button>
	  </RBS.OverlayTrigger>
  );
};

const Asset = props => {
	const displayName = GameModel.GameDefinition.getIn(['assets', props.name, 'name']);
	const displaySuffix = GameModel.GameDefinition.getIn(['assets', props.name, 'suffix']);

	const productivity = GameModel.GameDefinition.getIn(['assets', props.name, 'productivity']);
	const productivity_displayed = GameModel.resourcesToString(productivity);

	const title = <h4>{displayName}{displaySuffix}: <small>{props.qty}</small></h4>;

	return (
		<RBS.Panel className="es-asset" header={title}>
			<p>
				Produces: {productivity_displayed} per sec
			</p>
			<PriceButton pbType={PriceButtonType.BUY} name={props.name} onClick={props.onBuy} qty={1} />
			<PriceButton pbType={PriceButtonType.BUY} name={props.name} onClick={props.onBuy} qty={10} />
			<PriceButton pbType={PriceButtonType.BUY} name={props.name} onClick={props.onBuy} qty={100} />
			<br />
			<PriceButton pbType={PriceButtonType.SELL} name={props.name} onClick={props.onSell} qty={1}  />
			<PriceButton pbType={PriceButtonType.SELL} name={props.name} onClick={props.onSell} qty={10}  />
			<PriceButton pbType={PriceButtonType.SELL} name={props.name} onClick={props.onSell} qty={100}  />
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
					([name, qty]) =>
						<Asset
							key={name}
							name={name}
							qty={qty}
							onBuy={(amount) => { dispatch(Actions.buyAsset(name, amount)) }}
							onSell={(amount) => { dispatch(Actions.sellAsset(name, amount)) }}
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