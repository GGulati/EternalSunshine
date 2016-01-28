var React = require('react');
var ReactDOM = require('react-dom');
var RBS = require('react-bootstrap');

var Game = require('./Game.jsx');

export const App = props => (
	<div className="es-main">
		<Header />
		<Game.ConnectedGame />
  </div>
);

const Header = props => (
	<RBS.PageHeader>Eternal Sunshine <small>candles to suns</small></RBS.PageHeader>
);