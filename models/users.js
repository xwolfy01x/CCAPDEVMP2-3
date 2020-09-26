/*
	First Name
	Last Name
	Password
	Confirm Password
	Email
	_ID - Mongo DB
	likedPosts[Schema.type.ObjectId] 
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String, 
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	posts: [{
		type: mongoose.Types.ObjectId,
		ref: 'Post'
	}]
}, { versionKey: '_somethingElse' });
userSchema.statics.isExisting = async email => {
	return User.findOne({email: email}).then(result => {
		return result;
	}).catch(err => {
		console.log(err);
	})
};
userSchema.statics.getUser = async id => {
	return User.findOne({_id: id}).populate('posts').then(result => {
		return result;
	}).catch(err => {
		console.log(err);
	});
}
const User = mongoose.model('User', userSchema, 'Users');
module.exports = User;