$(document).ready(function() {
  adjustMenuVisibility();

  $(window).resize(adjustMenuVisibility);

  function adjustMenuVisibility() {
    if ($(window).width() <= 700) {
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
    closeMenu();
  });

  // Automatically close the menu when a nav link is clicked
  $("#nav-menu ul li a").click(function() {
    if ($(window).width() <= 700) {
      closeMenu();
    }
  });

  // Function to close the menu
  function closeMenu() {
    $("#nav-menu ul li").addClass("hidden");
    $("#close-menu").addClass("hidden");
    $("#menu-button").removeClass("hidden");
    $(".initial").removeClass("hidden");
  }
});
