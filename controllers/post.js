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
				workoutID: work._id
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
				workoutID: work._id
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
exports.postRecipe = (req,res, next) =>{
	var currdate = new Date();
    const post = new Post({
        title: req.body.recipetitle,
        dateCreated: currdate.toISOString().slice(0,10),
        dateUpdated: currdate.toISOString().slice(0,10),
		likes: [],
        category: "Recipe",
		image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${req.files.postimg2[0].filename}`))
    });
    post.save();
    moveFile(path.join(__dirname, '..', `/public/uploads/${req.files.postimg2[0].filename}`), path.join(__dirname, '..', `/public/uploads/${post._id}/postimg.png`)).then(() => {
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
    });
    let category = req.body.recipechecks.split(' ');
    let category2 = [];
    for(let i = 0; i < category.length; i++)
        if(category[i] != '')
            category2.push(category[i]);
    let ingredients = req.body.ingredients.split('¿');
    let ingredients2 = [];
    for(let i = 0; i < ingredients.length; i++)
        if(ingredients[i] != '')
            ingredients2.push(ingredients[i]);
    const recipe = new Recipe({
        ingredients: ingredients2,
        category: category2,
        postID: post._id,
		steps: []
    });
    recipe.save();
    //creating each step in recipes
    let stepIDs = [];
	let stepimages = req.files.steppic;
	for(i = 0; i < stepimages.length; i++){ 
		if (stepimages.length===1) {
			const step = new Step({
				image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${stepimages[i].filename}`)),
				instruction: req.body.stepdesc,
				recipeID: recipe._id
			});
			step.save();
			stepIDs.push(step._id);
		}
		else {
			const step = new Step({
				image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${stepimages[i].filename}`)),
				instruction: req.body.stepdesc[i],
				recipeID: recipe._id
			});
			step.save();
			stepIDs.push(step._id);
		}
		moveFile(path.join(__dirname, '..', `/public/uploads/${stepimages[i].filename}`), path.join(__dirname, '..', `/public/uploads/${post._id}/steppic${i}.png`)).then(() => {
			console.log('File Added Successfully')
		}).catch(err => {
			console.log(err);
		});
	}
	recipe.steps = stepIDs;
	Step.findOneAndUpdate({id: recipe._id}, {steps: recipe.steps}, {new:true}).then(() => {
		console.log('Recipe updated');
		setTimeout(function(){res.redirect(`post/${post._id}`);}, 4000);
	}).catch(err => {
		console.log(err);
	});
}
exports.getWorkouts = (req, res, next) => {
	let result1, result2;
	let topPosts = Post.getWTopPosts().then(result => {
		result1 = result;
		for (let i = 0; i< result1.length; i++) {
			var date = new Date(result[i].dateCreated);
			result1[i].image = `uploads/${result[i]._id}/postimg.png`;
			result1[i].displayDate = date.toString().slice(4,15);
		}
		let newPosts = Post.getWNewPosts().then(data => {
			result2=data;
			for (let i = 0; i< result1.length; i++) {
				var date = new Date(data[i].dateCreated);
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString().slice(4,15);
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
			var date = new Date(result[i].dateCreated);
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString().slice(4,15);
		}
		let newPosts = Post.getWNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date(data[i].dateCreated);
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString().slice(4,15);
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
			var date = new Date(result[i].dateCreated);
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString().slice(4,15);
		}
		let newPosts = Post.getWMoreNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date(data[i].dateCreated);
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString().slice(4,15);
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
			var date = new Date(result[i].dateCreated);
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString().slice(4,15);
		}
		let newPosts = Post.getRNewPosts().then(data => {
			result2=data;
			for (let i = 0; i< result1.length; i++) {
				var date = new Date(data[i].dateCreated);
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString().slice(4,15);
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
			var date = new Date(result[i].dateCreated);
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString().slice(4,15);
		}
		let newPosts = Post.getRNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date(data[i].dateCreated);
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString().slice(4,15);
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
			var date = new Date(result[i].dateCreated);
			result1[i].image = `uploads/${result[i]._id}/postimg.png`; 
			result1[i].displayDate = date.toString().slice(4,15);
		}
		let newPosts = Post.getRMoreNewPosts().then(data => {
			console.log(data);
			result2=data;
			for (let i = 0; i< result2.length; i++) {
				var date = new Date(data[i].dateCreated);
				result2[i].image = `uploads/${data[i]._id}/postimg.png`; 
				result2[i].displayDate = date.toString().slice(4,15);
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

    let postres = Post.getSearch(req.query.search).then(result =>{
        resultpost = result;
        for(let i = 0; i<resultpost.length; i++){
			var date = new Date(result[i].dateCreated);
            resultpost[i].image = `uploads/${result[i]._id}/postimg.png`;
            resultpost[i].displayDate = date.toString().slice(4,15);
        }
        res.render("searchpost", {
            user: req.session.user,
            result: resultpost
        });
    })
}
exports.getEditPost = (req, res, next) => {
	let exerciseImgs = [];
	let exercises=[];
	let steps = [];
	let owner = false;
	let stepImgs = [];
	if (req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
		if(req.session.user) {
			for (i=0; i< req.session.user.posts.length; i++)
				if (req.session.user.posts[i]._id === req.params.postId)
					owner = true
			if (owner)	{
				let post = Post.getPost(req.params.postId);
				post.then(result2 => {
					let acquiredPost = result2;
					if (acquiredPost.category === 'Workout') {
						let data = Workout.getDetails(req.params.postId);
						data.then(result => {
							let acquiredWork = result;
							for (let i=0; i<acquiredWork.exercises.length; i++) {
								exercises.push(acquiredWork.exercises[acquiredWork.exercises.length-i-1])
								exerciseImgs.push(`/uploads/${acquiredPost._id}/exerpic${acquiredWork.exercises.length-i-1}.png`)
							}
							res.render('editpost', {
								post: acquiredPost,
								workout: acquiredWork,
								exercises: exercises,
								exerciseImgs: exerciseImgs,
								user: req.session.user
							});
						});
					} else if (acquiredPost.category === 'Recipe') {
						let data = Recipe.getDetails(req.params.postId);
						data.then(result => {
							let acquiredRecipe = result;
							for (let i = 0; i< acquiredRecipe.steps.length; i++) {
								steps.push(acquiredRecipe.steps[acquiredRecipe.steps.length-1-i]);
								stepImgs.push(`/uploads/${acquiredPost._id}/steppic${acquiredRecipe.steps.length-i-1}.png`);
							}
							res.render('editPost2', {
								post: acquiredPost,
								recipe: acquiredRecipe,
								steps: steps,
								stepImgs: stepImgs,
								user: req.session.user
							});
						})
					}
				});
			} else res.redirect('/');
		} 
		else res.redirect('/');
	} else next();
}
exports.getPost = (req, res, next) => {
	let exerciseImgs = [];
	let stepImgs = [];
	let guest;
	let acquiredReviews = [];
	let exercises=[];
	let steps = [];
	let userLiked;
	if (req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
		let post = Post.getPost(req.params.postId);
		post.then(result2 => {
			let acquiredPost = result2;
			if (acquiredPost.category === 'Workout') {
				let data = Workout.getDetails(req.params.postId);
				data.then(result => {
					let acquiredWork = result;
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
				});
			}
			else if (acquiredPost.category==="Recipe") {
				let data = Recipe.getDetails(req.params.postId);
				data.then(result => {
					let acquiredRecipe = result;
					for (let i = 0; i< acquiredRecipe.steps.length; i++) {
						steps.push(acquiredRecipe.steps[acquiredRecipe.steps.length-1-i]);
						stepImgs.push(`/uploads/${acquiredPost._id}/steppic${acquiredRecipe.steps.length-i-1}.png`);
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
						res.render('viewPost2', {
							post: acquiredPost,
							recipe: acquiredRecipe,
							steps: steps,
							stepImgs: stepImgs,
							userLiked: userLiked,
							user: req.session.user,
							guest: guest,
							comments: acquiredReviews
						});
					});
				})
			}
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
		res.send('success!');
	})
}
exports.deletePost = (req, res, next) =>{
	if (req.params.postId.match(/^[0-9a-fA-F]{24}$/)){
		let post = Post.getPost(req.params.postId);
		post.then(result =>{
			let acquiredPost = result;
			if(acquiredPost.category == "Workout"){
				let workout = Workout.getWorkout(req.params.postId);
				workout.then(wresult => {
					let workoutRef = wresult;
					Exercise.deleteExercise(workoutRef._id).catch(err => {
						console.log(err);
					});
					Workout.deleteWorkout(req.params.postId).catch(err => {
						console.log(err);
					});
				})
			}else if(acquiredPost.category == "Recipe"){
				let recipe = Recipe.getRecipe(req.params.postId);
				recipe.then(rresult => {
					let recipeRef = rresult;
					Step.deleteStep(recipeRef._id).catch(err => {
						console.log(err);
					})
					Recipe.deleteRecipe(req.params.postId).catch(err => {
						console.log(err);
					});
				})
			}
			Post.deletePost(req.params.postId).catch(err => {
				console.log(err);
			});
			Review.deleteReviews(req.params.postId).catch(err => {
				console.log(err);
			});
			User.findById({_id: req.session.user._id}).then(uresult => {
				uresult.posts.splice(uresult.posts.indexOf(req.params.postId),1);
				let temp = uresult.posts;
				User.updateOne({_id: req.session.user._id}, {posts: temp}).then(() => {
					console.log('Deleted Post on User');
				}).catch(err => {
					console.log(err);
				})
			})
			try {
				fs.rmdirSync(path.join(__dirname, '..', `/public/uploads/${req.params.postId}`), {recursive: true});
				console.log('Images are deleted!');
			} catch(err) {
				console.log(err);
			}
			res.redirect("/profile");
		}).catch(err => {
				console.log(err);
		});
	}
}
exports.postEditWorkout = (req,res, next) => {
    Exercise.deleteMany({workoutID: req.body.workid}).then(function(){
        var currdate = new Date();
        Post.findOneAndUpdate(
            {_id: req.body.postid}, 
            {
                title: req.body.workouttitle,
                dateUpdated: currdate.toISOString().slice(0,10),
                image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${req.files.postimg[0].filename}`))
            },
            {new: true}
        ).then(function(){
            moveFile(path.join(__dirname, '..', `/public/uploads/${req.files.postimg[0].filename}`), 
            path.join(__dirname, '..', `/public/uploads/${req.body.postid}/postimg.png`)).then(() => {
                console.log('File Added Successfully')
            })
            let bodyFocus = req.body.bodyfocuslist.split(' ');
            let bodyFocus2 = [];
            for (let i = 0; i < bodyFocus.length; i++)
                if (bodyFocus[i] != '')
                    bodyFocus2.push(bodyFocus[i])
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
						workoutID: req.body.workid
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
						workoutID: req.body.workid
                    });
                    exercise.save();
                    exerciseIDs.push(exercise._id);
                }
				moveFile(path.join(__dirname, '..', `/public/uploads/${exerimages[i].filename}`), path.join(__dirname, '..', `/public/uploads/${req.body.postid}/exerpic${i}.png`)).then(() => {
					console.log('File Added Successfully')
				}).catch(err => {
					console.log(err);
				});
            }
            Workout.findOneAndUpdate(
                {_id: req.body.workid},
                {
					duration: parseInt(req.body.workoutdur),
                    difficulty: req.body.workoutdiff,
                    bodyfocus: bodyFocus2,
                    exercises: exerciseIDs
                },
                {new: true}
            ).then(function(){
                setTimeout(function(){res.redirect(`post/${req.body.postid}`);}, 4000);
            })              
        })
    })
};
exports.postEditRecipe = (req,res, next) => {
    Step.deleteMany({recipeID: req.body.recid}).then(function(){
		var currdate = new Date();
        Post.findOneAndUpdate(
            {_id: req.body.postid}, 
            {
                title: req.body.recipetitle,
                dateUpdated: currdate.toISOString().slice(0,10),
                image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${req.files.postimg2[0].filename}`))
            },
            {new: true}
        ).then(function(){
            moveFile(path.join(__dirname, '..', `/public/uploads/${req.files.postimg2[0].filename}`), path.join(__dirname, '..', `/public/uploads/${req.body.postid}/postimg.png`)).then(() => {
                console.log('File Added Successfully')
            }).catch(err => {
                console.log(err);
            });
            let category = req.body.recipechecks.split(' ');
            let category2 = [];
            for(let i = 0; i < category.length; i++)
                if(category[i] != '')
                    category2.push(category[i]);
            let ingredients = req.body.ingredients.split('¿');
            let ingredients2 = [];
            for(let i = 0; i < ingredients.length; i++)
                if(ingredients[i] != '')
                    ingredients2.push(ingredients[i]);
            let stepIDs = [];
            let stepimages = req.files.steppic;
            for(i = 0; i < stepimages.length; i++){ 
                if (stepimages.length===1) {
                    const step = new Step({
                        image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${stepimages[i].filename}`)),
						instruction: req.body.stepdesc,
						recipeID: req.body.recid
                    });
                    step.save();
                    stepIDs.push(step._id);
                }
                else {
                    const step = new Step({
                        image: fs.readFileSync(path.join(__dirname, '..', `/public/uploads/${stepimages[i].filename}`)),
						instruction: req.body.stepdesc[i],
						recipeID: req.body.recid
                    });
                    step.save();
                    stepIDs.push(step._id);
                }
                moveFile(path.join(__dirname, '..', `/public/uploads/${stepimages[i].filename}`), path.join(__dirname, '..', `/public/uploads/${req.body.postid}/steppic${i}.png`)).then(() => {
                    console.log('File Added Successfully')
                }).catch(err => {
                    console.log(err);
                });
            }
            Recipe.findOneAndUpdate(
                {_id: req.body.recid},
                {
					ingredients: ingredients2,
					category: category2,
                    steps: stepIDs
                },
                {new: true}
            ).then(function(){
                setTimeout(function(){res.redirect(`post/${req.body.postid}`);}, 4000);
            })
        })
    })
}