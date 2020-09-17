const express = require('express');
const route = express();
const postController = require('../controllers/post.js');
const upload = require('../util/uploadImages.js');
route.post('/newworkoutpost', upload.fields([{name:'postimg', maxCount: 1}, {name: 'exerpic', maxCount: 20}]), postController.postWorkout);
route.get('/workouts', postController.getWorkouts);
route.get('/seemoretopwork', postController.getWorkSeemoreTop); 
route.get('/seemorenewwork', postController.getWorkSeemoreNew);
route.get('/recipes', postController.getRecipes);
route.get('/search', postController.getsearchposts);
route.get('/seemoretoprecipe', postController.getRecSeemoreTop); 
route.get('/seemorenewrecipe', postController.getRecSeemoreNew);
route.get('/post/:postId', postController.getPost);
route.post('/newrecipepost', upload.fields([{name:'postimg', maxCount: 1}, {name: 'steppic', maxCount: 20}]),postController.postRecipe)
route.post('/post/likePost', postController.likePost);
module.exports = route;
