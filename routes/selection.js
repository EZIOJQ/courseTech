let express = require('express'),
	router = express.Router(),
	db = require('../models/')
	helper = require('../help/selection')



router.route('/')
	.get(helper.getSelections)
	.post(helper.createSelection)

router.route('/:selectionId')
	.get(helper.getSelectionById)
	.delete(helper.deleteSelection)


module.exports = router;