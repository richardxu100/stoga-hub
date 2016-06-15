$(document).ready(function() {
	//close a message
	$('.message .close').on('click', function() {
	    $(this).closest('.message').transition('fade');
	  });	
  $('select.dropdown').dropdown();
});
