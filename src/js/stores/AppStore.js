var AppDispatcher = require('../dispatcher/AppDispatcher');
var AC = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ga = require('react-google-analytics');

var onMobile = !!navigator.userAgent.match(AC.MOBILE_REGEXP),
    onSafari = !!navigator.userAgent.match(AC.SAFARI_REGEXP);

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(AC.CHANGE_EVENT);
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
  TweenLite.to($(".menu-item-icon"),AC.ITEM_DELAY,{
    opacity: 1
  });

	$(".menu-item").each(function(i){
    var delay = AC.ITEM_DELAY * i,
	      dist = Math.min($(document).height(),$(document).width())/AC.REL_DIST,
        $els = $(this).children(".menu-item-button");

    // Move menu buttons inward
    TweenLite.to($els,AC.MOVE_DURATION,{
      y:      dist,
      color:  AC.COLORS.WHITE,
      backgroundColor: AC.ITEM_COLORS[i],
      ease:   Quad.easeInOut,
    });
	});

  // Release
  TweenLite.to($(".menu-toggle-button"),AC.MOVE_DURATION,{
    delay:  AC.MOVE_DURATION/3,
    color:  AC.COLORS.GREY,
    scaleX: AC.SMALL_SCALE,
    scaleY: AC.SMALL_SCALE,
    ease:   Quad.easeInOut,
  });
}

function closeMenu(){
	$(".menu-item").each(function(i){
    var delay = AC.ITEM_DELAY * i,
        $els = $(this).children(".menu-item-button");

    // Change color faster so blend works
    TweenLite.to($(this).children(".menu-item-button"),AC.MOVE_DURATION*(onSafari ? 0.3 : 2), {
      color: AC.COLORS.DARK_GREY,
      backgroundColor: AC.COLORS.DARK_GREY
    });

    // Move menu buttons inward
    TweenLite.to($els,AC.MOVE_DURATION,{
      y: 0,
      ease: Quad.easeInOut
    });
  });

  // Absorb
  TweenLite.to($(".menu-toggle-button"),AC.BOUNCE_DURATION+AC.CLOSE_DELAY,{
    delay:  AC.MOVE_DURATION/2,
    color:  AC.COLORS.WHITE,
    scaleX: AC.DEFAULT_SCALE,
    scaleY: AC.DEFAULT_SCALE,
    ease:   Quad.easeInOut
  });
}

function resizeElements(isOpen){
  var h = $(window).height(),
      w = $(window).width(),
      r = Math.min(w,h),
      largerButtons = ".menu-toggle-button, .menu-item-bounce, .menu-item-button";

  // Increase scale if on mobile
  if(onMobile) { r += AC.MOBILE_SCALE_ADD; }

  // Scale menu
  $("#main").height(h)
    .offset({ top: -h/2 });
  $(".menu").height(h)
    .width(r);
  $(".menu-item-button").height(r*AC.REL_SCALE_2)
    .width(r*AC.REL_SCALE_2);
  $(largerButtons).height(r*AC.REL_SCALE)
    .width(r*AC.REL_SCALE)
    .css("margin-left",-r*AC.REL_SCALE/2)
    .css("margin-top",-r*AC.REL_SCALE/2);

  // Scale icons
  $("i.menu-toggle-icon, i.menu-item-icon").css('font-size',r*AC.REL_SCALE_LH+'em')
    .css('top',r*AC.REL_SCALE_2*0.3);

  // if(isOpen) { scaleItems(r); };
}

function scaleItems(r) {
  TweenLite.to($(".menu-item-button"),AC.MOVE_DURATION,{
    y: r/AC.REL_DIST,
    ease: Elastic.easeInOut
  });
}

function sendPageView() {
  ga('create', AC.GA_TRACKING_ID, 'auto');
  ga('send', 'pageview');
}

function showButton() {
  TweenLite.to($(".menu-toggle-icon, .menu-items"),AC.MOVE_DURATION*3,{
    opacity: 1,
    ease: Quad.easeInOut
  });
}

module.exports = AppStore;
