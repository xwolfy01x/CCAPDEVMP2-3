const Comment = require('../models/reviews');
exports.postComment = (req, res, next) => {
    let currDate = new Date;
    const comment = new Comment({
        postId: req.body.postId,
        userId: req.session.user._id,
        dateCreated: currDate.toISOString().slice(0,10),
        comment: req.body.comment
    });
    comment.save();
    res.redirect(`/post/${req.body.postId}`);
}
exports.editComment = (req, res, next) => {
    console.log(req.body.comment);
    Comment.findOneAndUpdate(
        {_id: req.body.commentId}, 
        {comment: req.body.comment}
    ).then(() => {
        res.redirect(`/post/${req.body.postId}`);
    }).catch(err => {
        console.log(err);
    })
}
exports.deleteComment = (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.body.commentId}
    ).then(() => {
        res.redirect(`/post/${req.body.postId}`);
    }).catch(err => {
        console.log(err);
    })
}