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

Router.route('/clubs_page', function() {
	this.render("clubs_masthead", {to:"header"});
	this.render("club_filter", {to:"main"})
});

//events for the club registering page
Template.club_register.events({
	//do collection stuff
	'click .js-register-club':function(event) {
		// console.log("insert worked?");
		var club_name, club_pres, email, club_desc, room_num, club_day, img_link;
		club_name = $('#club_name').val();
		club_pres = $('#club_pres').val();
		email = $('#email').val();
		club_desc = $('#club_desc').val();
		room_num = $('#room_num').val();
		img_link = $('#img_link').val();
		club_day = $('#club_day').val();
		if (Meteor.user()) {
			Clubs.insert({
				club_name: club_name,
				club_pres: club_pres,
				email: email,
				room_num: room_num,
				img_link: img_link,
				club_day: club_day,
				club_desc: club_desc,
				createdBy: Meteor.user()._id
			});
			// console.log("insert actually works");
		}
	}
});

Template.club_filter.helpers({
	clubs:function() {
		return Clubs.find();
	},
});
