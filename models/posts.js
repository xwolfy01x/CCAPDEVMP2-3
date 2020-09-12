/*
   POST
	   id - id
	   userid - Object id
	   dateCreated - Date
	   dateUpdated - Date
	   Title of Post - String
	   category: 'Workout|Recipes' - String
	   likes - Number
	
   Research

   Steps
	   id
	   steptitle - String
	   picture - Buffer
	   instructions - String
	   recipeid - Object Id

 Workout:
	 id
	 Duration    30mins, 60 mins
	 Difficulty
	   Body Focus:
		   Abdomen
		   quadriceps
		   glutes
		   triceps
		   biceps    
		   back
		   chest
		   Whole Body
	   postid
	 
 Exercises:
   picture
   name
   instructions
   workoutid
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
	title: {
		type: String,
		requried: true
	},
	dateCreated: {
		type: Date,
		required: true
	},
	dateUpdated: {
		type: Date,
		required: true
	},
	likes: [{
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	category: {
		type: String,
		required: true
	},
	image: {
		type: Buffer,
		required: true
	}
}, { versionKey: '_somethingElse' });
postSchema.statics.getTopPosts = async function() {
	return Post.find().sort({likes: -1}).limit(5).then(result =>{
		return result;
	}).catch(err => {
		console.log(err);
	});
}
postSchema.statics.getMoreTopPosts = async function() {
	return Post.find().sort({likes: -1}).limit(25).then(result =>{
		return result;
	});
}
postSchema.statics.getNewPosts = async function() {
	return Post.find().sort({dateCreated: -1}).limit(5).then(result =>{
		return result;
	}).catch(err => {
		console.log(err);
	});
}
postSchema.statics.getMoreNewPosts = async function() {
	return Post.find().sort({dateCreated: -1}).limit(25).then(result =>{
		return result;
	});
}
postSchema.statics.getPost = async function(id) {
	return Post.findOne({_id: id}).then(result => {
		return result;
	}).catch(err => {
		console.log(err);
	})
}
const Post = mongoose.model('Post', postSchema, 'Posts');
module.exports = Post;
