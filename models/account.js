var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	email: String, // key
	//role: [{type: String}], // user, guide, admin ...
});

Account.plugin(passportLocalMongoose, {usernameField: 'email', hashField: 'password'});
module.exports = mongoose.model('Account', Account);
