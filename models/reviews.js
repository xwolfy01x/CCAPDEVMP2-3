/*
	id
	postid
	userId
	dateCreated
	comment
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema ({
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
	review: {
		type: String,
		required: true
	}
});
reviewSchema.statics.getReviews = async id => {
	return Review.find({postId: id}).populate('userId');
}
const Review = mongoose.model('Review', reviewSchema, 'reviews') 
module.exports = Review;