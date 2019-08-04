let express = require('express'),
	router = express.Router(),
	db = require('../models/')
	helper = require('../help/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = {
  port: 8080,
  secret: 'super-secret-key',
  databaseUrl: 'mongodb://localhost/courses',
  saltRounds: 10
};

let authMiddleware = require('./auth');

router.post('/login', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.body.email) {
    db.User.findOne({email: request.body.email }, (error, document) => {

      if (error) {
        responseData.errors.push({type: 'critical', message: error})

        response.json(responseData)
      } else {
        console.log(document)
        if (!document) {
          responseData.errors.push({type: 'warning', message: 'No user exists with this username.'})

          response.json(responseData)
        } else {
          bcrypt.compare(request.body.password, document.password, function (hashError, hashPasswordCheck) {
            if (!hashError) {
              console.log('hashed!')
              if (hashPasswordCheck) {
                responseData.data.token = jwt.sign(document._doc, config.secret)
                responseData.success = true
              } else {
                responseData.errors.push({type: 'critical', message: 'The password is incorrect.'})
              }

              response.json(responseData)
            } else {
              responseData.errors.push({type: 'critical', message: 'Please try again.'})

              response.json(responseData)
            }
          })
        }
      }
    })
  } else {
    responseData.errors.push({type: 'critical', message: 'Username not provided.'})

    response.json(responseData)
  }
})


// Register
router.post('/register', (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.body.email != '') {
    // Check user exists
    db.User.findOne({email: request.body.email}, (error, document) => {
      console.log(error);
      console.log(document);
      if (!document) {
        // User does not exists

        // Hash password
        bcrypt.hash(request.body.password, config.saltRounds, function (hashError, hashPassword) {
          if (!hashError) {
            // Define new user
            let user = {
              email: request.body.email,
              password: hashPassword,
              name: request.body.name
            }

            // Save into database
            db.User.create(user, function (errorCreate, documentCreate) {
              let userId = documentCreate._id

              if (userId) {
                responseData.success = true
                responseData.data.userId = userId
              } else {
                responseData.errors.push({type: 'default', message: 'Please try again.'})
              }

              response.json(responseData)
            })
          } else {
            responseData.errors.push({type: 'default', message: 'Please try again.'})
          }
        })

      } else {
        // User already exists

        responseData.errors.push({type: 'warning', message: 'The email is taken. Please choose something else.'})

        response.json(responseData)
      }
    })
  } else {
    responseData.errors.push({type: 'critical', message: 'Username not provided.'})

    response.json(responseData)
  }
})


router.route('/')
	.get(helper.getUsers)
	.post(helper.createUser)

router.route('/:userId')
	.get(helper.getUserById)
	.put(helper.updateUser)
	.delete(helper.deleteUser)

router.route('/:userId/selections')
	.get(helper.getSelectionsByUser)

module.exports = router;
