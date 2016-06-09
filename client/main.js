//Iron Router, routing the webpages
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

//to work in chrome meteor update iron:middleware-stack
Router.route('/', function() {
	this.render("masthead", {to:"main"});
});

Router.route('/club_register', function() {
	this.render("club_register", {to:"main"});
});

//events for the club registering page
Template.club_register.events({
	//do collection stuff
	'click .js-register-club':function(event) {
		var club_name, club_pres, email, club_desc;
		club_name = $('#club_name').val();
		club_pres = $('#club_pres').val();
		email = $('#email').val();
		club_desc = $('#club_desc').val();
		if (Meteor.user()) {
			Clubs.insert({
				name: club_name,
				president: club_pres,
				email: email,
				description: club_desc,
				createdBy: Meteor.user()._id
			});
		}
	}
});
