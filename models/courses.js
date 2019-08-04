let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
	name: String,
	description: String
})

let userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String
})

let favoSchema = new mongoose.Schema({
	courseId: String,
	userId: String,
})

let selectionSchema = new mongoose.Schema({
	courseId: String,
	userId: String,
})


courseSchema.path('name').required(true);
userSchema.path('name').required(true);
userSchema.path('email').required(true);
userSchema.path('password').required(true);

let User = mongoose.model('User', userSchema)
let Courses = mongoose.model('Courses', courseSchema);
let Favo = mongoose.model('Favo', favoSchema);
let Selection = mongoose.model('Selection', selectionSchema);


module.exports = {
	Courses,
	User,
	Favo,
	Selection
}
