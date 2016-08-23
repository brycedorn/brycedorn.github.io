var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ga = require('react-google-analytics');

var onMobile = !!navigator.userAgent.match(AppConstants.MOBILE_REGEXP),
    onSafari = !!navigator.userAgent.match(AppConstants.SAFARI_REGEXP);

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(AppConstants.CHANGE_EVENT);
  }
});

AppDispatcher.register(function(payload){
  switch (payload.action.actionType) {
    case 'open':
    	openMenu();
    	break;
    case 'close':
    	closeMenu();
    	break;
    case 'resize':
      resizeElements(payload.action.isOpen);
      break;
    case 'pageview':
      sendPageView();
      break;
    case 'show':
      showButton();
      break;
    default:
    	break;
  }
});

function openMenu() {
  TweenLite.to($(".menu-item-icon"),AppConstants.ITEM_DELAY,{
    opacity: 1
  });

	$(".menu-item").each(function(i){
    var delay = AppConstants.ITEM_DELAY*i,
	      dist = Math.min($(document).height(),$(document).width())/AppConstants.RELATIVE_DIST,
        buttons = $(this).children(".menu-item-button"),
        button_captions = $(".menu-item-text");

    // Move menu buttons outward
    TweenLite.to(buttons,AppConstants.MOVE_DURATION,{
      y:      dist,
      color:  AppConstants.COLORS.WHITE,
      backgroundColor: AppConstants.ITEM_COLORS[i],
      ease:   Quad.easeInOut,
    });

    // Show captions
    TweenLite.to(button_captions,AppConstants.MOVE_DURATION,{
      delay: AppConstants.MOVE_DURATION,
      opacity: 1,
      ease:  Quad.easeInOut,
    });
	});

  // Release
  TweenLite.to($(".menu-toggle-button"),AppConstants.MOVE_DURATION,{
    delay:  AppConstants.ITEM_DELAY*3,
    color:  AppConstants.COLORS.GREY,
    scaleX: AppConstants.SMALL_SCALE,
    scaleY: AppConstants.SMALL_SCALE,
    ease:   Quad.easeInOut,
  });

  sendEvent(AppConstants.ACTIONS.OPEN_MENU);
}

function closeMenu(){
	$(".menu-item").each(function(i){
    var delay = AppConstants.ITEM_DELAY * i,
        buttons = $(this).children(".menu-item-button"),
        button_captions = $(".menu-item-text");

    // Move menu buttons inward
    TweenLite.to(buttons,AppConstants.MOVE_DURATION,{
      y: 0,
      color: AppConstants.COLORS.DARK_GREY,
      backgroundColor: AppConstants.COLORS.DARK_GREY,
      ease: Quad.easeInOut
    });

    // Hide captions
    TweenLite.to(button_captions,AppConstants.MOVE_DURATION,{
      opacity: 0,
      ease:  Quad.easeInOut,
    });
  });

  // Absorb
  TweenLite.to($(".menu-toggle-button"),AppConstants.MOVE_DURATION,{
    delay:  AppConstants.ITEM_DELAY*3,
    color:  AppConstants.COLORS.WHITE,
    scaleX: AppConstants.DEFAULT_SCALE,
    scaleY: AppConstants.DEFAULT_SCALE,
    ease:   Quad.easeInOut
  });

  sendEvent(AppConstants.ACTIONS.CLOSE_MENU);
}

function resizeElements(isOpen){
  var h = $(window).height(),
      w = $(window).width(),
      r = Math.min(w,h),
      largerButtons = ".menu-toggle-button, .menu-item-button";

  // Increase scale if on mobile
  if(onMobile) { r += AppConstants.MOBILE_SCALE_ADD; }

  // Scale menu
  $("#main").height(h)
    .offset({ top: -h/2 });
  $(".menu").height(h)
    .width(r/2);
  $(".menu-item-button").height(r*AppConstants.RELATIVE_SCALE_2)
    .width(r*AppConstants.RELATIVE_SCALE_2);
  $(largerButtons).height(r*AppConstants.RELATIVE_SCALE)
    .width(r*AppConstants.RELATIVE_SCALE)
    .css("margin-left",-r*AppConstants.RELATIVE_SCALE/2)
    .css("margin-top",-r*AppConstants.RELATIVE_SCALE/2);

  // Scale icons
  $("i.menu-toggle-icon").css('font-size',r*AppConstants.RELATIVE_LINE_HEIGHT+'em')
    .css('top',r*AppConstants.RELATIVE_SCALE_2*0.24);

  $(".menu-item-button-content").css('font-size',r*AppConstants.RELATIVE_LINE_HEIGHT+'em')
    .css('top',r*AppConstants.RELATIVE_SCALE_2*0.173);

  if(isOpen) { scaleItems(r); };

  sendEvent(AppConstants.ACTIONS.RESIZE);
}

function scaleItems(r) {
  TweenLite.to($(".menu-item-button"),AppConstants.MOVE_DURATION,{
    y: r/AppConstants.RELATIVE_DIST,
    ease: Elastic.easeInOut
  });
}

function sendPageView() {
  ga('create', AppConstants.GA_TRACKING_ID, 'auto');
  ga('send', AppConstants.ACTIONS.PAGEVIEW);
}

function sendEvent(event) {
  ga('send', 'event', 'Menu', event);
}

function showButton() {
  TweenLite.to($(".menu-toggle-icon, .menu-items"),AppConstants.MOVE_DURATION,{
    opacity: 1,
    ease: Quad.easeInOut
  });
}

module.exports = AppStore;
