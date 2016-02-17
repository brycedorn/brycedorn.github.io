/** @jsx React.DOM */
var React = require('react');
var TweenLite = require('gsap');
var zepto = require('npm-zepto');
var ga = require('react-google-analytics');
var AppActions = require('../actions/AppActions');
var AC = require('../constants/AppConstants');
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

var MenuFactory = React.createFactory(MenuItem);

var MainApp = React.createClass({
  componentDidMount: function() {
    this.handleResize();
    this.handlePageView();
    window.addEventListener('resize', this.handleResize);
    this.showButton();
  },

  showButton: function() {
    AppActions.showButton();
  },

  handleResize: function() {
    AppActions.resizeElements(this.state.menuOpen);
  },

  handlePageView: function() {
    AppActions.sendPageView();
  },

  getInitialState: function() {
    var onMobile = !!navigator.userAgent.match(AC.MOBILE_REGEXP),
        onSafari = !!navigator.userAgent.match(AC.SAFARI_REGEXP);

    return {menuOpen: false, onMobile: onMobile, onSafari: onSafari};
  },

  handleClick: function() {
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

  createSVGFilter: function() {
    return {__html: AC.SVG_FILTER_HTML};
  },

  render: function(){
    var menuLen = AC.ITEMS.length,
        angle = Math.floor(360/(menuLen));
        startingAngle = AC.START_ANGLE,
        svg = !(this.state.onSafari || this.state.onMobile || AC.SVG_FILTER_DISABLED) ? (<div className="filter-wrapper"><div dangerouslySetInnerHTML={this.createSVGFilter()}/></div>) : (<div></div>),
        GAInitializer = ga.Initializer;

    var rotAngs = $.map(new Array(menuLen), function(n,i) {
      return startingAngle + angle * i;
    });

    var menuItems = AC.ITEMS.map(function(item, index) {
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
        {svg}
        <div className="ga">
          <GAInitializer />
        </div>
      </div>
    );
  }
});

module.exports = MainApp;
