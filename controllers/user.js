const User = require('../models/users');
const CryptoJS = require('crypto-js');
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
		password: CryptoJS.AES.encrypt(req.body.password, "OFIT-Secret").toString(), 
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
			if (result.email === req.body.email && CryptoJS.AES.decrypt(result.password, "OFIT-Secret").toString(CryptoJS.enc.Utf8) === req.body.password){
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
	let oneUser = User.getUser(req.session.user._id);
	oneUser.then(result => {
		req.session.user = result;
		res.render("profile", {
			user: req.session.user
		})
	})
};
exports.getPostform = (req, res, next) =>{
	if (req.session.user)
		res.render("post",{
			user: req.session.user
		})
	else res.redirect('/');
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
			if(err)
				console.log(err);
			else
				res.redirect('profile');
		}
	)
};