/** @jsx React.DOM */
var React = require('react');
var TweenMax = require('gsap');
var zepto = require('npm-zepto');
var AppActions = require('../actions/AppActions');
var AppConstants = require('../constants/AppConstants');
var AppStore = require('../stores/AppStore');

var MenuItem = React.createClass({
  render: function() {
    var rotAng = this.props.rotAng,
        rotPos = { 
                   transform:'rotate('+rotAng+'deg);', 
                   WebkitTransform:'rotate('+rotAng+'deg);',
                   msTransform:'rotate('+rotAng+'deg);' 
                 },
        rotNeg = { 
                   transform:'rotate(-'+rotAng+'deg);', 
                   WebkitTransform:'rotate(-'+rotAng+'deg);',
                   msTransform:'rotate(-'+rotAng+'deg);' 
                 };

    return (
      <li className="menu-item" style={rotNeg}>
        <a className="menu-item-button" href={this.props.url}>
          <i className={"menu-item-icon fa " + this.props.icon} style={rotPos}></i>
        </a>
        <div className="menu-item-bounce"/>
      </li>
    );
  }
});

var MainApp = React.createClass({
  componentDidMount: function() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    AppActions.resizeElements(this.state.menuOpen);
  },

  getInitialState: function() {
    return {menuOpen: false};
  },

  handleClick: function(){
    if(this.state.menuOpen) {
      AppActions.closeMenu();
      this.setState({menuOpen: false});
    } else {
      AppActions.openMenu();
      this.setState({menuOpen: true});
    }
  },

  handleTouchStart: function() {
    this.handleClick();
    event.preventDefault();
    event.stopPropagation();
  },

  // Because React doesn't know these attributes
  createSVGFilter: function() { 
    return {__html: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic"stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -14" result="goo" /><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs></svg>'};
  },

  render: function(){
    var menuLen = AppConstants.ITEMS.length,
        angle = Math.floor(360/(menuLen));
        startingAngle = AppConstants.START_ANGLE;

    var rotAngs = $.map(new Array(menuLen), function(n,i) {
      return startingAngle + angle * i;
    });

    var menuItems = AppConstants.ITEMS.map(function(item, index) {
      return (
        <MenuItem key={index} icon={item.icon} url={item.url} rotAng={rotAngs[index]} />
      );
    });

    return (
      <div>
        <div className="menu">
          <div className="menu-wrapper">
            <ul className="menu-items">
              {menuItems}
            </ul>
            <a className="menu-toggle-button" onClick={this.handleClick} onTouchStart={this.handleTouchStart}>
              <i className="fa fa-paw menu-toggle-icon"></i>
            </a>
          </div>
        </div>
        <div className="filter-wrapper">
          <div dangerouslySetInnerHTML={this.createSVGFilter()} />
        </div>
      </div>
    );
  }
});

module.exports = MainApp;
