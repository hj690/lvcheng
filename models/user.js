var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', {
	name: String,
	password: String,
	role: [{type: String, enum: ['user', 'guide', 'admin']}],
});