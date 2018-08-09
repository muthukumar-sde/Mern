var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res, next){	
	res.json('Welcome to VELAN MERN Admin');	   
});

module.exports = router;
