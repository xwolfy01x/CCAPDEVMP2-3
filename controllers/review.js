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
    res.send({user: req.session.user, comment: comment});
}
exports.editReview = (req, res, next) => {
    Review.findOneAndUpdate(
        {_id: req.body.commentId}, 
        {review: req.body.comment}
    ).then(() => {
        res.send(true);
    }).catch(err => {
        console.log(err);
    })
}
exports.deleteReview = (req, res, next) => {
    Review.findOneAndDelete(
        {_id: req.body.commentId}
    ).then(() => {
        res.send('Deleted Review!');
    }).catch(err => {
        console.log(err);
    })
}