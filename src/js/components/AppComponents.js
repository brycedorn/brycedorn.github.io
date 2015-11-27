/** @jsx React.DOM */
var React = require('react');
var TweenMax = require('gsap'); 
var AppActions = require('../actions/AppActions');
var AppConstants = require('../constants/AppConstants');
var AppStore = require('../stores/AppStore');
 
var MenuItem = React.createClass({
  render: function() {  
    var rotPos = { 'transform': 'rotate('+this.props.rotAng+'deg);' },
        rotNeg = { 'transform': 'rotate(-'+this.props.rotAng+'deg);' };

    return (
      <li className="menu-item" style={rotNeg}>
        <a className="menu-item-button" href={this.props.url}>
          <i className={"menu-item-icon fa " + this.props.icon} style={rotPos}></i>
        </a>
        <div className="menu-item-bounce"></div>
      </li>
    );
  }
});

var MainApp = React.createClass({
  // Scale elements
  componentDidMount: function() {
    AppActions.resizeElements();
    // <!-- Possibly add radial gradient for all colors on center circle -->
  },

  getInitialState: function() {
    return {menuOpen: false};
  },

  handleClick: function(){
    TweenMax.to($('.menu-toggle-icon'),AppConstants.BOUNCE_DURATION,{
      rotation: this.state.menuOpen ? 180 : 0,
      ease: Quint.easeInOut,
    });

    if(this.state.menuOpen) {
      AppActions.closeMenu();
      this.setState({menuOpen: false});
    } else {
      AppActions.openMenu();
      this.setState({menuOpen: true});
    }
  },

  handleTouchStart: function() {
    $(this).trigger("mousedown");
    event.preventDefault();
    event.stopPropagation();
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

    var rot90 = { 'transform': 'matrix(-1, 0, 0, -1, 0, 0);' };

    return (
      <div className="content">
        <div className="menu">
          <div className="menu-wrapper">
            <ul className="menu-items">
              {menuItems}
            </ul>
            <button className="menu-toggle-button" onClick={this.handleClick} onTouchStart={this.handleTouchStart}>
              <i className="fa fa-circle-o-notch menu-toggle-icon" style={rot90}></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MainApp;
