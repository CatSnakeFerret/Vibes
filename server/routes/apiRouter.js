const express = require('express');
const router = express.Router();

//controllers
const userController = require('../controllers/userController.js');
const placesController = require('../controllers/placesController');
const cookieController = require('../controllers/cookieController.js');

// signup route handler
router.post('/signup', userController.signup, (req, res, next) => {
  res.status(201).json({ message: 'User created!', user: res.locals.user });
});

// login route handler
router.post(
  '/login',
  userController.login,
  cookieController.setSSIDCookie,
  (req, res, next) => {
    res
      .status(200)
      .json({ message: 'Logged in successfully!', user: res.locals.user });
  }
);

router.get(
  '/checkIfReturningUser',
  cookieController.getSSIDCookie,
  (req, res) => {
    return res.status(200).json(res.locals.username);
  }
);

// populate beenList handler, add middleware for querying mongo for beenList and SQL for location names
router.post('/beenList', userController.beenList, (req, res) => {
  res.status(200).json({ beenList: res.locals.beenList });
});

router.post('/savedList', userController.savedList, (req, res) => {
  res.status(200).json({ savedList: res.locals.savedList });
});

//populate results from user initiated search
router.post('/placeSearch', placesController.getResults, (req, res) => {
  res.status(200).send(res.locals.searchResults);
});

router.patch('/savePlace', userController.saveplace, (req, res) => {
  res.status(200).send('success');
});

router.patch('/ratePlace', userController.rateplace, (req, res) => {
  res.status(200).send(res.locals.result);
});

router.post('/getRating', userController.getrating, (req, res) => {
  res.status(200).send(res.locals.result);
});

//populate tags for searchList
// router.get('/searchTags')

// to add global error handler in server.js later

module.exports = router;
