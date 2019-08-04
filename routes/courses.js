let express = require('express'),
	router = express.Router(),
	db = require('../models/')
	helper = require('../help/courses')



router.route('/')
	.get(helper.getCourse)
	.post(helper.createCourse)

router.route('/:courseId')
	.get(helper.getCourseById)
	.put(helper.updateCourse)
	.delete(helper.deleteCourse)

module.exports = router;
