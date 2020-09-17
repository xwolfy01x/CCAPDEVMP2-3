const Post = require('../models/posts');
const User = require('../models/users');
const Workout = require('../models/workouts');
const Recipe = require('../models/recipes');
const Exercise = require('../models/exercises');
const Step = require('../models/steps');
const Review = require('../models/reviews');
const fs = require('fs');
const moveFile = require('move-file');
const path = require('path');
exports.postWorkout = (req, res, next) =>{
	var currdate = new Date();
    const post = new Post({
        title: req.body.workouttitle,
        dateCreated: currdate.toISOString().slice(0,10),
        dateUpdated: currdate.toISOString().slice(0,10),
		likes: [],
		dislikes: [],
        category: "Workout",
		image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${req.files.postimg[0].filename}`))
	});
	post.save();
	moveFile(path.join(__dirname, '..', `/public/uploads/${req.files.postimg[0].filename}`), 
	path.join(__dirname, '..', `/public/uploads/${post._id}/postimg.png`)).then(() => {
		console.log('File Added Successfully')
	}).catch(err => {
		console.log(err);
	});
    let user = User.isExisting(req.session.user.email);
    user.then(result => {
        result.posts.push(post._id);
        User.findOneAndUpdate(
            {_id : result._id},
            {posts : result.posts}
		).then(() => {
			console.log('Post added to User');
		})
	})
	let bodyFocus = req.body.bodyfocuslist.split(' ');
	let bodyFocus2 = [];
	for (let i = 0; i < bodyFocus.length; i++)
		if (bodyFocus[i] != '')
			bodyFocus2.push(bodyFocus[i])
    const work = new Workout({
	     duration: parseInt(req.body.workoutdur),
         difficulty: req.body.workoutdiff,
         bodyfocus: bodyFocus2,
		 exercises: [],
         postID:  post._id
    });
	work.save();
	let exerciseIDs = [];
	let exerimages = req.files.exerpic;
	for(i = 0; i < exerimages.length; i++){ 
		if (exerimages.length===1) {
			const exercise = new Exercise({
				name: req.body.exername,
				image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${exerimages[i].filename}`)),
				description: req.body.exerdesc,
				repetitions: parseInt(req.body.exerrep,10),
				sets: parseInt(req.body.exerset, 10),
			});
			exercise.save();
			exerciseIDs.push(exercise._id);
		}
		else {
			const exercise = new Exercise({
				name: req.body.exername[i],
				image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${exerimages[i].filename}`)),
				description: req.body.exerdesc[i],
				repetitions: parseInt(req.body.exerrep[i],10),
				sets: parseInt(req.body.exerset[i], 10),
			});
			exercise.save();
			exerciseIDs.push(exercise._id);
		}
		moveFile(path.join(__dirname, '..', `/public/uploads/${exerimages[i].filename}`), path.join(__dirname, '..', `/public/uploads/${post._id}/exerpic${i}.png`)).then(() => {
			console.log('File Added Successfully')
		}).catch(err => {
			console.log(err);
		});
	}
	work.exercises = exerciseIDs;
	Workout.findOneAndUpdate({id: work._id}, {exercises: work.exercises}, {new:true}).then(() => {
		console.log('Workout updated');
		setTimeout(function(){res.redirect(`post/${post._id}`);}, 4000);
	}).catch(err => {
		console.log(err);
	})
}
exports.getWorkouts = (req, res, next) => {
	let result1, result2;
	let topPosts = Post.getWTopPosts().then(result => {
		result1 = result;
		var date = new Date();
		for (let i = 0; i< result1.length; i++) {
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getWNewPosts().then(data => {
			result2=data;
			for (let i = 0; i< result1.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('workout', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2	
			});
		})
	});
}
exports.getWorkSeemoreTop = (req, res, next) =>{
	let result1, result2;
	let topPosts = Post.getWMoreTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getWNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('workout', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2
			});
		})
	});
}
exports.getWorkSeemoreNew = (req, res, next) =>{
	let result1, result2;
	let topPosts = Post.getWTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getWMoreNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('workout', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2	
			});
		})
	});
}
exports.getRecipes = (req, res, next) => {
	let result1, result2;
	let topPosts = Post.getRTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getRNewPosts().then(data => {
			result2=data;
			for (let i = 0; i< result1.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('recipe', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2	
			});
		})
	});
}
exports.getRecSeemoreTop = (req, res, next) =>{
	let result1, result2;
	let topPosts = Post.getRMoreTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getRNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('recipe', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2
			});
		})
	});
}
exports.getRecSeemoreNew = (req, res, next) =>{
	let result1, result2;
	let topPosts = Post.getRTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getRMoreNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('recipe', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2	
			});
		})
	});
}
exports.getsearchposts = (req,res, next) => {
    let resultpost;
    var date = new Date();
    let postres = Post.getSearch(req.query.search).then(result =>{
        resultpost = result;
        for(let i = 0; i<resultpost.length; i++){
            resultpost[i].image = `uploads/${result[i]._id}/postimg.png`;
            resultpost[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
        }
        res.render("searchpost", {
            user: req.session.user,
            result: resultpost
        });
    })
}
exports.getPost = (req, res, next) => {
	let exerciseImgs = [];
	let acquiredPost;
	let acquiredWork
	let guest;
	let acquiredReviews = [];
	let exercises=[];
	let userLiked;
	if (req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
		let data = Workout.getDetails(req.params.postId);
		data.then(result => {
			acquiredWork = result;
			let post = Post.getPost(req.params.postId);
			post.then(result2 => {
				acquiredPost = result2;
				for (let i=0; i<acquiredWork.exercises.length; i++) {
					exercises.push(acquiredWork.exercises[acquiredWork.exercises.length-i-1])
					exerciseImgs.push(`/uploads/${acquiredPost._id}/exerpic${acquiredWork.exercises.length-i-1}.png`)
				}
				if (req.session.user != null)
					userLiked = acquiredPost.likes.includes(req.session.user._id);
				let reviews = Review.getReviews(req.params.postId);
				reviews.then(result3 => {
					acquiredReviews = result3;
					if (!req.session.user) {
						guest=new User({
							fname: '',
							lname: '',
							password: '',
							email: '',
							posts: []
						});
						guest.addReview = false;
					}
					else {
						guest = req.session.user;
						guest.addReview = true;
					}
					res.render('viewPost', {
						post: acquiredPost,
						workout: acquiredWork,
						exercises: exercises,
						exerciseImgs: exerciseImgs,
						userLiked: userLiked,
						user: req.session.user,
						guest: guest,
						comments: acquiredReviews
					});
				});
			})
		});
	} else next();
}
exports.likePost = (req, res, next) => {
	let userLiked;
	let post = Post.getPost(req.body.postId);
	let newLikes = [];
	post.then(result => {
		newLikes = result.likes;
		userLiked = newLikes.includes(req.session.user._id);
		if (!userLiked) 
			newLikes.push(req.session.user._id);
		else newLikes.splice(newLikes.indexOf(req.session.user._id), 1);
		Post.findOneAndUpdate({_id: req.body.postId}, {likes: newLikes}, {new:true}).catch (err => {
			console.log(err);
		});
		res.redirect(`/post/${req.body.postId}`)
	})

}