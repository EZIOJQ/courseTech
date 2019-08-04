let db = require("../models")



exports.getUsers = function(req,res){
	db.User.find()
	.then(function(user){
		res.json(user)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.createUser = function(req,res){
	
	db.User.create(req.body)
	.then(function(user){
		res.json(user)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.updateUser = function(req, res){
	db.Courses.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true})
	.then(function(user){
		res.json(user)
	})

	.catch(function(err){
		res.send(err)
	})
}

exports.getUserById = function(req, res){
	db.User.findById(req.params.userId)
	.then(function(user){
		res.json(user)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.deleteUser = function(req, res){
	db.User.remove({_id: req.params.userId})
	db.Selection.remove({userId: req.params.userId})
	.then(function(newCourse){
		res.send('Done!')
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.getSelectionsByUser = function(req, res){
	db.Selection.find({userId: req.params.userId}, 'courseId')
	.then(function(selections){
		let res = [];
		selections.forEach(function(id){
			course = db.Course.findById(id, 'name');
			res.push(course);
		})
		res.json(res);
	})
	.catch(function(err){
		res.send(err)
	})
}


