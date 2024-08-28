$(document).ready(function() {
  adjustMenuVisibility();

  $(window).resize(adjustMenuVisibility);

  function adjustMenuVisibility() {
      if ($(window).width() <= 800) {
          $("#nav-menu ul li").addClass("hidden");
          $("#close-menu").addClass("hidden");
          $("#menu-button").removeClass("hidden");
          $(".initial").removeClass("hidden");
      } else {
          $("#menu-button").addClass("hidden");
          $("#close-menu").addClass("hidden");
          $("#nav-menu ul li").removeClass("hidden");
          $(".initial").removeClass("hidden");
      }
  }

$("#menu-button").click(function() {
  $("#menu-button").addClass("hidden");
  $("#close-menu").removeClass("hidden");
  $("#nav-menu ul li").removeClass("hidden");
  $(".initial").addClass("hidden");
});

$("#close-menu").click(function() {
  $("#nav-menu ul li").addClass("hidden");
  $("#close-menu").addClass("hidden");
  $("#menu-button").removeClass("hidden");
  $(".initial").removeClass("hidden");

});

});

