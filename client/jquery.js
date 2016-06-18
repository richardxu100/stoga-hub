$(document).ready(function() {
	//close a message
	$('.message').click(function() {
		console.log('jQuery works inside client/jquery.js');
	});
	$('.close').click(function() {
	  $('.ui.message').fadeOut('500');
	  console.log('hitting close button is registered');
	})

  $('select.dropdown').dropdown();

  //dimmer on cards
	$('.special.cards .image').dimmer({
	  on: 'hover'
	});  
});
console.log('normal js works inside client/jquery.js');