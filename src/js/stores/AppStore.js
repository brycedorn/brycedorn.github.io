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
	      $els = $(this).children(".menu-item-bounce");

    // Release
    if(onMobile) {
      TweenLite.to($els,AC.BOUNCE_DURATION,{
        delay:  delay,
        scaleX: AC.SMALL_SCALE,
        scaleY: AC.SMALL_SCALE,
        ease:   Quad.easeIn,
      });
    } else {
  	  TweenLite.to($els,AC.BOUNCE_DURATION,{
  	    delay: delay,
        scaleX: AC.SMALL_SCALE,
  	    scaleY: AC.SMALL_SCALE,
  	    ease:   Quint.easeInOut,
  	    onComplete:function(){
  	      TweenLite.to($els,AC.BOUNCE_DURATION,{
  	        scaleY: AC.LARGE_SCALE,
  	        ease:   Quint.easeInOut,
  	        onComplete:function(){
  	          TweenLite.to($els,AC.EASE_DURATION,{
  	            scaleX: AC.SMALL_SCALE,
                scaleY: AC.SMALL_SCALE,
  	            ease:   Elastic.easeOut
  	          });
  	        }
  	      });
  	    }
  	  });
    }

    // Move menu buttons outward & colorize
	  TweenLite.to($(this).children(".menu-item-button"),AC.MOVE_DURATION,{
	    delay: delay,
	    y: dist,
      color: AC.COLORS.WHITE,
      backgroundColor: AC.ITEM_COLORS[i],
	    ease: Quad.easeInOut
	  });
	});

  TweenLite.to($(".menu"),AC.MOVE_DURATION*3,{
    rotation: 360,
    transformOrigin: "50% 100%",
    ease: Quad.easeInOut
  });
}

function closeMenu(){
	$(".menu-item").each(function(i){
    var delay = AC.ITEM_DELAY * i,
    		$els = $(this).children(".menu-item-bounce");

    // Absorb
    if(onMobile) {
      TweenLite.to($els, AC.BOUNCE_DURATION+AC.CLOSE_DELAY,{
        delay:  delay + AC.MOVE_DURATION*0.3,
        scaleX: AC.DEFAULT_SCALE,
        scaleY: AC.DEFAULT_SCALE,
        ease:   Linear.easeOut
      });
    } else {
      TweenLite.to($els, AC.BOUNCE_DURATION+AC.CLOSE_DELAY,{
        delay:  delay + AC.MOVE_DURATION*0.3,
        scaleY: AC.LARGE_SCALE,
        ease:   Quint.easeInOut,
        onComplete:function(){
          TweenLite.to($els, AC.BOUNCE_DURATION,{
            scaleY: AC.SMALL_SCALE,
            ease:   Quint.easeInOut,
            onComplete:function(){
              TweenLite.to($els, AC.EASE_DURATION,{
                scaleY: AC.DEFAULT_SCALE,
                ease:   Elastic.easeOut
              });
            }
          });
        }
      });
    }

    // Change color faster so blend works
    TweenLite.to($(this).children(".menu-item-button"), AC.MOVE_DURATION*(onSafari ? 0.3 : 2), {
        color: AC.COLORS.GREY,
        backgroundColor: AC.COLORS.GREY
    });

    // Move menu buttons inward
    TweenLite.to($(this).children(".menu-item-button"),AC.MOVE_DURATION*2,{
      y: 0,
      ease: Quad.easeIn
    });
  });

  TweenLite.to($(".menu"),AC.MOVE_DURATION*3,{
    rotation: 0,
    transformOrigin: "50% 100%",
    ease: Quad.easeInOut
  });
}

function resizeElements(isOpen){
  var h = $(window).height(),
      w = $(window).width(),
      r = Math.min(w,h),
      largerButtons = ".menu-toggle-button, .menu-item-bounce, .menu-item-button";

  // Increase scale if on mobile
  if(onMobile) { r += MOBILE_SCALE_ADD; }

  // Scale menu
  $("#main").height(h*0.8);
  $(".menu").height(h/2)
    .width(r/2);
  $(".menu-item-button").height(r*AC.REL_SCALE_2)
    .width(r*AC.REL_SCALE_2);
  $(largerButtons).height(r*AC.REL_SCALE)
    .width(r*AC.REL_SCALE)
    .css("margin-left",-r*AC.REL_SCALE/2)
    .css("margin-top",-r*AC.REL_SCALE/2);

  // Scale icons
  $("i.menu-toggle-icon, i.menu-item-icon").css('font-size',r*AC.REL_SCALE_LH+'em')
    .css('top',r*AC.REL_SCALE_2*0.3);

  if(isOpen) { scaleItems(r); };
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
