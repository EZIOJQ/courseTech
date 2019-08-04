let db = require("../models")

exports.getCourse = function(req,res){
	db.Courses.find()
	.then(function(courses){
		res.json({
			"results": courses
		})
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.getCourseById = function(req, res){
	db.Courses.findById(req.params.courseId)
	.then(function(course){
		res.json(course)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.createCourse = function(req,res){
	db.Courses.create(req.body)
	.then(function(newCourse){
		res.status(201).json(newCourse)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.updateCourse = function(req, res){
	db.Courses.findOneAndUpdate({_id: req.params.courseId}, req.body, {new:true})
	.then(function(course){
		res.json(course)
	})

	.catch(function(err){
		res.send(err)
	})
}

exports.deleteCourse = function(req,res){
	db.Courses.remove({_id: req.params.courseId})
	.then(function(message){
		res.send('Done!')
	})
	.catch(function(err){
		res.send(err)
	})
}