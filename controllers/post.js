const Post = require('../models/posts');
const User = require('../models/users');
const Workout = require('../models/workouts');
const Exercise = require('../models/exercises');
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
		setTimeout(function(){res.redirect(`post/${post._id}`);}, 2000);
	}).catch(err => {
		console.log(err);
	})
}
exports.getWorkouts = (req, res, next) => {
	let result1, result2;
	let topPosts = Post.getTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getNewPosts().then(data => {
			result2=data;
			for (let i = 0; i< result1.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('exercises', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2	
			});
		})
	});
}
exports.getMoreWorkouts = (req, res, next) =>{
	let result1, result2;
	let topPosts = Post.getmoreTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('exercises', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2	
			});
		})
	});
}
exports.getSeemoreTop = (req, res, next) =>{
	let result1, result2;
	let topPosts = Post.getMoreTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('exercises', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2
			});
		})
	});
}
exports.getSeemoreNew = (req, res, next) =>{
	let result1, result2;
	let topPosts = Post.getTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date();
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString(result[i].dateCreated).slice(4,15);
		}
		let newPosts = Post.getMoreNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date();
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString(data[i].dateCreated).slice(4,15);
			}
			res.render('exercises', {
				user: req.session.user,
				topPosts: result1,
				newPosts: result2	
			});
		})
	});
}
exports.getPost = (req, res, next) => {
	let exerciseImgs = [];
	let acquiredPost;
	let acquiredWork
	let guest;
	let acquiredReviews = [];
	let exercises=[];
	if (req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
		let data = Workout.getDetails(req.params.postId);
		data.then(result => {
			acquiredWork = result;
			let post = Post.getPost(req.params.postId);
			post.then(result2 => {
				acquiredPost = result2;
				for (let i=0; i<acquiredWork.exercises.length; i++) {
					exercises.push(acquiredWork.exercises[i])
					exerciseImgs.push(`/uploads/${acquiredPost._id}/exerpic${i}.png`)
				}
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
						user: req.session.user,
						guest: guest,
						comments: acquiredReviews
					});
				});
			})
		});
	} else next();
}