$(document).ready(function() {
  var frames = 400;
  var anim = "easeInOutCubic";
  var h = $(window).height();
  $(".closed").children().hide();
  $("body").fadeIn(frames * 2);
  $("#left").height(h);
  $("#blog").height(h);
  $("#works").height(h - 100);
  $("#contact").height(h);
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

  var myScroll = new IScroll('#blog');
  $("#blog").find(".content").delay(600).fadeIn(frames * 2);

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
});