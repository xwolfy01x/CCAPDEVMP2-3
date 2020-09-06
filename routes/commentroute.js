const express = require('express');
const route = express();
const commentController = require('../controllers/comment')
route.post('/postComment', commentController.postComment);
route.post('/editComment', commentController.editComment);
route.post('/deleteComment', commentController.deleteComment);
module.exports = route;