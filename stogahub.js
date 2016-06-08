//Iron Router, routing the webpages
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
	this.render("navbar", {to:"header"});
	this.render("masthead", {to:"main"});
});

Router.route('/signup', function() {
	this.render("navbar", {to:"header"});
	this.render("signup", {to:"main"});
});

if (Meteor.isClient) {
	
}

if (Meteor.isServer) {

}

