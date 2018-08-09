var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
var mongoose = require('mongoose');
var User = require('../models/User.js');
var passport = require('passport');
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var passportSystem = require('../system/passport');
var passConfig = require('../config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const pusher = new Pusher({
  appId: '491104',
  key: '325385c3016e317bfa77',
  secret: '9161bd2f9430dfc0f105',
  cluster: 'ap2',
  encrypted: true
});
//users list
router.post('/',  requireAuth, (req, res)=>{	
	let Promise = require('bluebird');
	let params = req.body;
	console.log(params)
	let skip = params.page || 0;
	var perPage = params.pageSize || 5;	
	var sorted = '-createdAt';
	var query = {$and : [{isDeleted: false}]};  
	if(req.body.filtered && req.body.filtered.length > 0) {
		var multifilters = [];  
		req.body.filtered.map((filter) => {
			if(filter.id === 'fullName') {
				multifilters.push({ fullName: { $regex : new RegExp(filter.value, 'i') } })
			}
			if(filter.id === 'email') {
				multifilters.push({ email: { $regex : new RegExp(filter.value, 'i') } })
			}
			if(filter.id === 'companyInfo') {
				multifilters.push({ companyInfo: { $regex : new RegExp(filter.value, 'i') } })
			}
		})
		 query = Object.assign(query.$and[0], {$or:multifilters})
	}	
	if(params.sorted && params.sorted.length > 0){
		let sort = params.sorted[0];	
		if(sort.desc){
           sorted = '-'+sort.id;
		}else{
			sorted = sort.id;
		}
	}
	console.log(query)
	Promise.all([
        User.find(query).limit(perPage).skip(perPage * skip).sort(sorted).exec(),
        User.find(query).count().exec()    
    ]).spread(function(users, count) {
        res.json({
            users: users,
            count: count          
        });
    }, function(err) {
        console.log(err);
	});
});
//Add user
router.post('/addUser', function(req, res, next){
	User.findOne({email: req.body.email})
	.then(user => {
		if(user){
			console.log(user);
			res.json({ success: false, message: "Email Already exist"})	
		} else {			
			var newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				fullName: req.body.firstName +' '+ req.body.lastName,
				email: req.body.email,
				password : 	createHash(req.body.password),
				companyInfo: req.body.company,
				isDeleted: false		
			});			
			newUser.save()
			.then(user => {	
				pusher.trigger('user-channel', 'user-event', {
					"message": "One new user added"
				});				
				res.json({ success: true, message: "User created successfully!"});

			})
			.catch(err => {
				console.log(err);
				return next(err);
			});
		}
	});
});

//Edit user
router.post('/editUser', function(req, res, next){
		let userId = req.body.userId
		var updateUser = {
			$set:{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			fullName: req.body.firstName +' '+ req.body.lastName,		
			companyInfo: req.body.company		
	   	}}

		User.findByIdAndUpdate(userId, updateUser, {new: true}, function(err, user){  
			if(err){				
					res.json({ success: false, message: "Something wrong when updating data!"})	
			}	else{
				res.json({ success: true, message: "User Updated successfully!"})	
			}
	});

});

router.delete('/deleteUser/:userId', (req, res, next)=>{
	let userId = req.params.userId;
  User.findByIdAndUpdate(userId, {isDeleted: true, deleted_at: new Date()}, (err, user)=>{
    if(err) {
      console.log(err);
      return next(err);
    }
		res.json({ success: true, message: "User Deleted successfully!"})	
  })
})

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log('^^^^^^^^^^^^^^')
		console.log( user, info)
		if(err) {
			console.log(err);
		}
		if(!user){
			return res.json({ success: false, message: info.message })
		}else{
			var token = tokenForUser(user._id)	
			return res.json({
					success: true,
					message: "login success",
					token: token
			})
		}
	})(req, res, next);
});

router.get('/userByEmail', function(req, res, next){
		console.log('in userByEmail');
		var q = req.query.email	  
		User.findOne({
		  isDeleted: false,
		  email: q
		})
		.exec((err, user)=>{
		  if (err){console.log(err);}		
		  if(user){
			res.json({
			  message: 'found email',
			  result: true
			})
		  } else {
			res.json({
			  message: 'email not found',
			  result: false
			})
		  }	  
	})
})

router.get('/fetchOneUser/:userId', (req, res, next)=>{
	console.log('fetchOneUser')
	let userId = req.params.userId;  
	User.findById(userId, (err, user)=>{
	  if(err) {
		console.log(err);
		return next(err);
	  }
	  res.json(user);
	})
  })

function tokenForUser(userId) {
	return jwt.encode({ sub: userId}, passConfig.jwtSecret);
}

// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


module.exports = router;
