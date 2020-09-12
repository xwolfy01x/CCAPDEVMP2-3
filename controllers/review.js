const Review = require('../models/reviews');
exports.postReview = (req, res, next) => {
    let currDate = new Date;
    const comment = new Review({
        postId: req.body.postId,
        userId: req.session.user._id,
        dateCreated: currDate.toISOString().slice(0,10),
        review: req.body.comment
    });
    comment.save();
    res.redirect(`/post/${req.body.postId}`);
}
exports.editReview = (req, res, next) => {
    Review.findOneAndUpdate(
        {_id: req.body.commentId}, 
        {review: req.body.comment}
    ).then(() => {
        res.redirect(`/post/${req.body.postId}`);
    }).catch(err => {
        console.log(err);
    })
}
exports.deleteReview = (req, res, next) => {
    Review.findOneAndDelete(
        {_id: req.body.commentId}
    ).then(() => {
        res.redirect(`/post/${req.body.postId}`);
    }).catch(err => {
        console.log(err);
    })
}