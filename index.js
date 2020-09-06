const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json()) 
app.set('view engine', 'pug')
app.set('views', 'views');
app.use(cookieparser())
app.use(session({
	secret: "very secret",
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000*60*60*24,
		httpOnly: true
	}
}))
const userRoute = require('./routes/userroute');
const postRoute = require('./routes/postroute');
const commentRoute = require('./routes/commentroute');
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute)
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://127.0.0.1:27017/OFIT', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3000);