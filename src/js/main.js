/** @jsx React.DOM */
var React = require('react');
var App = require('./components/AppComponents.js');

$(document).ready(function(){
  $(document).on("touchend",function(){ $(document).trigger("mouseup") });
});

React.render(
  <App />,
  document.getElementById('main')
);

// Todo: rotate elements on click