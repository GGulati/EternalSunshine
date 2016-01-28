var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');

import { App } from './Components/App.jsx';
import { masterReducer } from './Reducers/reducers.js';

const store = Redux.createStore(masterReducer);

ReactDOM.render(
  <ReactRedux.Provider store={store}><App /></ReactRedux.Provider>,
  document.getElementById('app')
);
