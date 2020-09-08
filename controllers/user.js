const User = require('../models/users');
const Post = require('../models/posts');
exports.getIndex = (req, res, next) => {
	res.render('index', {
		user: req.session.user,
	});
};
exports.getRegLog = (req, res, next) => {
	if (!req.session.user)
		res.render('register_login');
	else res.redirect('/');
};
exports.getLogReg = (req, res, next) => {
	if (!req.session.user)
		res.render('login_register');
	else res.redirect('/');
};
exports.postRegister = (req, res, next) => {
	const user = new User({
		fname: req.body.fname, 
		lname: req.body.lname, 
		password: req.body.password, 
		email: req.body.email,
		posts: []
	});
	let data = User.isExisting(user.email);
	data.then(result => {
		if (!result) {
			user.save();
			res.render('register_login', {
				success: 'Account Successfully Created'
			});
		}
		else {
			res.render('register_login', {
				regerror: 'Account already exists'
			})
		}
	}).catch(err => {
		console.log(err);
	});
};
exports.postLogin = (req, res, next) => {
	const user = new User({
		fname: null,
		lname: null, 
		password: req.body.password, 
		email: req.body.email
	});
	let data = User.isExisting(user.email);
	data.then(result => {
		if (result) {
			if (result.email === req.body.email && result.password === req.body.password){
				req.session.user = result;
				res.redirect('/');
      		} else res.render('login_register', {
				  error: 'Invalid Email or Password'
			  });
		} else
			res.render('login_register', {
				error: 'Invalid Email or Password'
			});
	}).catch(err => {
		console.log(err);
	});
};
exports.getLogout =(req, res, next) =>{
  req.session.destroy()		
	res.redirect("/");
};
exports.getProfile =(req, res, next) =>{
	let data;
	let userpost = [];
	let oneUser = User.getUser(req.session.user._id);
	oneUser.then(user => {
		req.session.user = user;
		for(i = 0;i < user.posts.length; i++){
			data = Post.getPost(req.session.user.posts[i]).then(result =>{
				userpost.push(result);
				if(userpost.length == req.session.user.posts.length){
					res.redirect('/profile');
				}
			})
		}
	})
};
exports.getPostform = (req, res, next) =>{
	res.render("post",{
		user: req.session.user
	})
};
exports.postUpdateUser = (req,res,next) =>{
	user = req.session.user
	User.findByIdAndUpdate(
		{_id: user._id},
		{fname: req.body.newfname, 
		lname: req.body.newlname,
		password: req.body.newpw},
		{new: true},
		(err, user) =>{
			if(err){
				console.log(err);
			}
			else{
				let data;
				let userpost = [];
				for(i = 0;i < req.session.user.posts.length; i++){
					data = Post.getPost(req.session.user.posts[i]).then(result =>{
						userpost.push(result);
						if(userpost.length == req.session.user.posts.length){
							res.render("profile",{
								user: user,
								postarr: userpost
							})
						}
					})
				}
			}
		}
	)
};