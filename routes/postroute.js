const express = require('express');
const route = express();
const postController = require('../controllers/post.js');
const upload = require('../util/uploadImages.js');
route.post('/newworkoutpost', upload.fields([{name:'postimg', maxCount: 1}, {name: 'exerpic', maxCount: 20}]), postController.postWorkout);
route.get('/exercises', postController.getWorkouts);
route.get('/post/:postId', postController.getPost);
route.get('/seemoretop', postController.getSeemoreTop); //more toppost
route.get('/seemorenew', postController.getSeemoreNew); //more newpost
module.exports = route;
