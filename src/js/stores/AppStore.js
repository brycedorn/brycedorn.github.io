var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

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
        dist = $(document).height() < $(document).width() ? $(document).height()/4 : $(document).width()/4,
	      $els = $(this).children(".menu-item-bounce");

    // Animate center button
	  TweenMax.to($els,AppConstants.BOUNCE_DURATION,{
	    delay:  delay,
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
	          })
	        }
	      });
	    }
	  });

    // Move menu buttons outward
	  TweenMax.to($(this).children(".menu-item-button"),AppConstants.MOVE_DURATION,{
	    delay: delay,
	    y: dist,
      color: AppConstants.COLORS.WHITE,
      backgroundColor: AppConstants.ITEM_COLORS[i],
      // background: 'radial-gradient('+AppConstants.DEFAULT_GREY+','+AppConstants.ITEM_COLORS[i]+');',
	    ease: Quint.easeInOut
	  });
	})
}

function closeMenu(){
	$(".menu-item").each(function(i){
    var delay = AppConstants.NEXT_DELAY * i,
    		$els = $(this).children(".menu-item-bounce");

    // Animate center button
    // Absorb
    TweenMax.to($els,AppConstants.BOUNCE_DURATION+0.1,{
      delay: delay + AppConstants.MOVE_DURATION*0.6,
      scaleX: AppConstants.LARGE_SCALE,
      scaleY: AppConstants.LARGE_SCALE,
      ease: Quint.easeInOut,
      onComplete:function(){
        TweenMax.to($els,AppConstants.BOUNCE_DURATION,{
          scaleY: AppConstants.SMALL_SCALE,
          ease:  Quint.easeInOut,
          onComplete:function(){
            TweenMax.to($els,AppConstants.EASE_DURATION,{
              scaleX: AppConstants.LARGE_SCALE,
              scaleY: AppConstants.LARGE_SCALE,
              ease: Elastic.easeOut
            })
          }
        })
      }
    });

    // Move menu buttons inward
    TweenMax.to($(this).children(".menu-item-button"),AppConstants.MOVE_DURATION,{
      delay: delay,
      y: 0,
      color: AppConstants.COLORS.GREY,
      backgroundColor: AppConstants.COLORS.GREY,
      ease: Quint.easeInOut
    });
  })
}

function resizeElements(isOpen){
  var h = $(window).height(),
      r = h < $(document).width() ? h : $(document).width(),
      largerButtons = ".menu-toggle-button, .menu-item-bounce, .menu-item-button",
      scale = (r < 700 ? r < 500 ? 1.7 : 1.2 : 1);

  // Scale menu
  $("#main").height(h*0.8);
  $(".menu").height(h/2);
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
    y: r/4,
    ease: Elastic.easeInOut
  });
}

module.exports = AppStore;
