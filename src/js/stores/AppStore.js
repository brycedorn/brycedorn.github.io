var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// TODO: Analyze everything in slow-mo

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
    default:
    	break;
  }
});

function openMenu() {
	$(".menu-item").each(function(i){
	  var delay = AppConstants.NEXT_DELAY * i,
        dist = $(document).height() < $(document).width() ? $(document).height()/AppConstants.REL_DIST : $(document).width()/AppConstants.REL_DIST,
	      $els = $(this).children(".menu-item-bounce");

    // Release
    if(onMobile) {
      TweenMax.to($els,AppConstants.BOUNCE_DURATION,{
        delay:  delay,
        scaleX: AppConstants.SMALL_SCALE,
        scaleY: AppConstants.SMALL_SCALE,
        ease:   Quad.easeIn,
      });
    } else {
  	  TweenMax.to($els,AppConstants.BOUNCE_DURATION,{
  	    delay: delay,
        scaleX: AppConstants.SMALL_SCALE,
  	    scaleY: AppConstants.SMALL_SCALE,
  	    ease:   Quint.easeInOut,
  	    onComplete:function(){
  	      TweenMax.to($els,AppConstants.BOUNCE_DURATION,{
  	        scaleY: AppConstants.LARGE_SCALE,
  	        ease: Quint.easeInOut,
  	        onComplete:function(){
  	          TweenMax.to($els,AppConstants.EASE_DURATION,{
  	            scaleX: AppConstants.SMALL_SCALE,
                scaleY: AppConstants.SMALL_SCALE,
  	            ease: Elastic.easeOut
  	          });
  	        }
  	      });
  	    }
  	  });
    }

    // Move menu buttons outward & colorize
	  TweenMax.to($(this).children(".menu-item-button"),AppConstants.MOVE_DURATION,{
	    delay: delay,
	    y: dist,
      color: AppConstants.COLORS.WHITE,
      backgroundColor: AppConstants.ITEM_COLORS[i],
	    ease: Quad.easeInOut
	  });
	});

  TweenMax.to($(".menu"),AppConstants.MOVE_DURATION*3,{
    rotation: 360,
    transformOrigin:"50% 100%",
    ease: Quad.easeInOut
  });
}

function closeMenu(){
	$(".menu-item").each(function(i){
    var delay = AppConstants.NEXT_DELAY * i,
    		$els = $(this).children(".menu-item-bounce");

    // Absorb
    if(onMobile) {
      TweenMax.to($els,AppConstants.BOUNCE_DURATION+0.1,{
        delay: delay + AppConstants.MOVE_DURATION*0.3,
        scaleX: AppConstants.DEFAULT_SCALE,
        scaleY: AppConstants.DEFAULT_SCALE,
        ease: Linear.easeOut
      });
    } else {
      TweenMax.to($els,AppConstants.BOUNCE_DURATION+0.1,{
        delay: delay + AppConstants.MOVE_DURATION*0.3,
        scaleY: AppConstants.LARGE_SCALE,
        ease: Quint.easeInOut,
        onComplete:function(){
          TweenMax.to($els,AppConstants.BOUNCE_DURATION,{
            scaleY: AppConstants.SMALL_SCALE,
            ease:  Quint.easeInOut,
            onComplete:function(){
              TweenMax.to($els,AppConstants.EASE_DURATION,{
                scaleY: AppConstants.DEFAULT_SCALE,
                ease: Elastic.easeOut
              });
            }
          });
        }
      });
    }

    // Change color faster so blend works
    TweenMax.to($(this).children(".menu-item-button"),AppConstants.MOVE_DURATION*2,{
      backgroundColor: AppConstants.COLORS.GREY,
      color: AppConstants.COLORS.GREY 
    });

    // Move menu buttons inward
    TweenMax.to($(this).children(".menu-item-button"),AppConstants.MOVE_DURATION*2,{
      y: 0,
      ease: Quad.easeIn
    });
  });

  TweenMax.to($(".menu"),AppConstants.MOVE_DURATION*3,{
    rotation: 0,
    transformOrigin:"50% 100%",
    ease: Quad.easeInOut
  });
}

function resizeElements(isOpen){
  var h = $(window).height(),
      w = $(window).width(),
      r = h < w ? h : w,
      largerButtons = ".menu-toggle-button, .menu-item-bounce, .menu-item-button";

  // Increase scale if on mobile
  if(onMobile) { r += 200; }

  // Scale menu
  $("#main").height(h*0.8);
  $(".menu").height(h/2).width(r/2);
  $(".menu-item-button").height(r*AppConstants.REL_SCALE_2).width(r*AppConstants.REL_SCALE_2);
  $(largerButtons).height(r*AppConstants.REL_SCALE).width(r*AppConstants.REL_SCALE);
  $(largerButtons).css("margin-left",-r*AppConstants.REL_SCALE*0.5).css("margin-top",-r*AppConstants.REL_SCALE*0.5);

  // Scale icons
  $("i.menu-toggle-icon, i.menu-item-icon").css('font-size',r*AppConstants.REL_SCALE_LH+'em').css('top',r*AppConstants.REL_SCALE_2*0.3);

  if(isOpen) { scaleItems(r); };
}

function scaleItems(r) {
  TweenMax.to($(".menu-item-button"),AppConstants.MOVE_DURATION,{
    delay: AppConstants.NEXT_DELAY,
    y: r/AppConstants.REL_DIST,
    ease: Elastic.easeInOut
  });
}

module.exports = AppStore;
