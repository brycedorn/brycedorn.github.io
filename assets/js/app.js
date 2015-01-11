var frames = 300;
var anim = "easeInOutCubic";

function openPage(t) {
  if (!$(t).hasClass("open")) {
    $(".open").parent().switchClass("pure-u-20-24", "pure-u-1-24", frames, anim)
    $(".open").children().hide();
    $(".open").switchClass("open", "closed", frames, anim);
    $(t).switchClass("closed", "open", frames, anim);
    $(t).parent().switchClass("pure-u-1-24", "pure-u-20-24", frames, anim);
    $(t).children().delay(frames / 2).show("fade", "slow");
  }
}

$(document).ready(function() {
  var h = $(window).width() > 767 ? $(window).height() - 40 : $(window).height() - 110;
  $(".closed").children().hide();
  $("body").fadeIn(frames);
  $("#left").height(h);
  $("#blog").height(h);
  $("#works").height(h);
  $("#contact").height(h);
  $('#blog').niceScroll();
  $('#works').niceScroll();
  $("#blog").find(".content").delay(frames).fadeIn(frames);

  $(".full").click(function() {
    openPage(this);
  });
  
  $(".menuitem").click(function() {
    if ($(this).hasClass("first")) {
      openPage($("#blog"));
    } else if ($(this).hasClass("second")) {
      openPage($("#works"));
    } else openPage($("#contact"));
  });
});

$(document).keydown(function(e) {
  switch(e.which) {
      case 37: // left
        var page = $(".open").attr("id");
        if (page == "works") {
          openPage($("#blog"));
        } else if (page == "contact") {
          openPage($("#works"));
        }
      break;

      case 39: // right
        var page = $(".open").attr("id");
        if (page == "blog") {
          openPage($("#works"));
        } else if (page == "works") {
          openPage($("#contact"));
        }
      break;

      default: return;
  }
  e.preventDefault();
});