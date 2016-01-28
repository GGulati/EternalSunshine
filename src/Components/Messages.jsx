var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');
var RR = require('react-redux');

var Actions = require('../Actions/actions.js');
var GameModel = require('../gameModel.js');

const Message = props => (
	<RBS.Alert bsStyle={props.style}>{props.text}</RBS.Alert>
);

const MessagesContainer = props => {
	const { dispatch, messages } = props;

	return (
		<div className="es-messages">
		{
			messages.map(message =>
				<Message key={message} text={message.get('text')} style={message.get('style')} />
			).toJS()
		}
		</div>
	);
};

const transformer = state => {
	return { messages: state.gamestate.get('messages') };
};
export const Messages = RR.connect(transformer)(MessagesContainer);