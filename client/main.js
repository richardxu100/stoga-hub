import { Template } from 'meteor/templating';

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
		event.preventDefault();
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
			console.log(Meteor.user()._id);
			Clubs.insert({
				club_name: club_name,
				club_pres: club_pres,
				email: email,
				room_num: room_num,
				img_link: img_link,
				club_day: club_day,
				club_desc: club_desc,
				createdBy: Meteor.user()._id,
				num_users: 1,
				members: [Meteor.user()._id] //member id's, not names
			});
		}
	}
});

Template.club_filter.helpers({
	clubs:function() {
		return Clubs.find();
	},
	is_creator:function() { //checks if the logged in user created the current Club
		var currentUser = Meteor.user()._id;
		var club_id = this._id;
		var currentClub = Clubs.findOne({_id: club_id});
		if(currentClub.createdBy === currentUser) {
			return true;
		}
	},
	not_member:function() {
		var club_id = this._id;
		var clicked_club = Clubs.findOne({_id: club_id});
		//check if the user is already in the club
		var currentUser = Meteor.user()._id; //id of the current logged in user
		if(clicked_club.members.includes(currentUser)) {
			return false; //hopefully do nothing (yes!, this ends the function)
		}		
		else {
			return true;
		}
	},
});

Template.club_filter.events({
	'click .js-del-club':function(event) {
		var club_id = this._id;
		console.log(club_id);
		//use jquery to hide the club
		//then remove it at the end of the animation
    $("#" + club_id).hide('slow', function(){
			Clubs.remove({"_id":club_id});
		});
	},
	'click .js-join-club':function(event) {
		console.log(this._id);
		var club_id = this._id;
		var clicked_club = Clubs.findOne({_id: club_id});
		//check if the user is already in the club
		var currentUser = Meteor.user()._id; //id of the current logged in user
		console.log(clicked_club.members.includes(currentUser));
		if(clicked_club.members.includes(currentUser)) {
			return false; //hopefully do nothing (yes!, this ends the function)
		}
		//if the currentUser isn't in the club 
		var members = Clubs.findOne({_id: club_id}).members;
		//add 1 to the number of users
		var num_users = Clubs.findOne({_id: club_id}).num_users;
		Clubs.update(club_id, 
			{$set: {num_users: num_users+1}});
		//add the member_id of user to the Club collection
		Clubs.update(club_id, 
			{$set: {members: members.concat(Meteor.user()._id)}})
		 // Products.remove({_id: Products.findOne({name:"ABC"})._id});
	},
	'click .js-leave-club':function(event) {
		//subtract 1 from the number of users
		var club_id = this._id;
		var num_users = Clubs.findOne({_id: club_id}).num_users;
		Clubs.update(club_id, 
			{$set: {num_users: num_users-1}});	
		//remove loggedIn user from the Club collection
		var currentUser = Meteor.user()._id; //id of the current logged in user
		var clicked_club = Clubs.findOne({_id: club_id});
		var indexOfMember = clicked_club.members.indexOf(currentUser);
		var members = Clubs.findOne({_id: club_id}).members;
		console.log("index of Member" + indexOfMember);
		members.splice(indexOfMember, 1);
		Clubs.update(club_id, 
			{$set: {members: members}});
	}

});