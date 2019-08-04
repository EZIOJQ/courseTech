let db = require("../models")



exports.getSelections = function(req,res){
	db.Selection.find()
	.then(function(selection){
		console.log(selection)
		res.json(selection)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.createSelection = function(req,res){
	db.Selection.create(req.body)
	.then(function(selection){
		res.json(selection)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.getSelectionById = function(req, res){
	db.Selection.findById(req.params.selectionId)
	.then(function(selection){
		res.json(selection)
	})
	.catch(function(err){
		res.send(err)
	})
}

exports.deleteSelection = function(req, res){
	db.Selection.remove({_id: req.params.selectionId})
	.then(function(){
		res.send('Done!')
	})
	.catch(function(err){
		res.send(err)
	})
}

