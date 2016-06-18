//Lazy Load with Session
Session.set("clubLimit", 8);

lastScrollTop = 0;
$(window).scroll(function(event){
  // test if we are near the bottom of the window
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    // where are we in the page?
    var scrollTop = $(this).scrollTop();      
    // test if we're going down
    if (scrollTop > lastScrollTop) {
      // yes we're heading down
      Session.set("clubLimit", Session.get("clubLimit") + 4);
    }
    lastScrollTop = scrollTop;
  } 
})