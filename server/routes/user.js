var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = reqiure('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){

	var username = req.body.user.username;
	var pass = req.body.user.password;

	User.create({
			username: username,
			passwordhash: bcrypt.hashSync(pass,10)
	}).then(

			function createSuccess(user){
				var token = jwt.sign({id:user.id}, "i_am_secret", {expiresIn:60*60*24});
				res.json({
						user: user,
						message:'u made an account pal'
						sessionToken: token
				});
			},
			function createError(err){
					res.send(500, err.message);
			}
	);		
});

module.exports = router;