/*
	id
	postid
	userId
	dateCreated
	comment
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema ({
	postId: { 
		type: mongoose.Types.ObjectId,
		ref: 'Post',
		required: true
	},
	userId: { 
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	dateCreated: { 
		type: Date,
		required: true
	},
	comment: {
		type: String,
		required: true
	}
});
commentSchema.statics.getComments = async id => {
	return Comment.find({postId: id}).populate('userId');
}
const Comment = mongoose.model('Comment', commentSchema, 'reviews') 
module.exports = Comment;