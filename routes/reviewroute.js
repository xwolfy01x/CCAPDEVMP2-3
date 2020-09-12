const express = require('express');
const route = express();
const commentController = require('../controllers/comment')
route.post('/postComment', commentController.postReview);
route.post('/editComment', commentController.editReview);
route.post('/deleteComment', commentController.deleteReview);
module.exports = route;