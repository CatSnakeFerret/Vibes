const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const db = require('../../models/placesModel');
const { ServerDescriptionChangedEvent } = require('mongodb');

const UserController = {
  // create a new user in the database
  // their information will be sent in the request body
  signup: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
      });
      res.locals.user = newUser;
      return next();
    } catch (error) {
      const err = new Error('Error in UserController.signup: ' + error.message);
      return next(err);
    }
  },

  saveplace: async (req, res, next) => {
    try {
      const { ssid } = req.cookies;
      const { place } = req.body;
      
      const user = await User.findOne({ _id: ssid });

      
      if (!user) {
        const err = new Error('Error in UserController.savedList: User not found');
        return next(err);
      }
      //get savedList from user, should be an array of IDs
      const { savedList } = user;
      if (!savedList.includes(place)) {
        savedList.push(place);
        user.savedList = savedList;
      }
      const result = await user.save()
      res.locals.result = result;
      console.log(result);
      next();

    }

      catch (error) {
        const err = new Error('Error in UserController.saveplace: ' + error.message);
        return next(err);
      }
  },

  rateplace: async (req, res, next) => {
    try {
      const { ssid } = req.cookies;
      const { place, rating } = req.body;
      
      const user = await User.findOne({ _id: ssid });
      if (!user) {
        const err = new Error('Error in UserController.savedList: User not found');
        return next(err);
      }
      //get beenList from user, should be an array of objects
      const { beenList } = user;

      let indexToModify;
      let modify = false;

      beenList.forEach((location, index) => {
        if (place == location.locationID) {
          indexToModify = index;
          modify = true;
        }
      })
      if (modify) {
        beenList[indexToModify].score = rating;
      }
      else {
        beenList.push({
          locationID: place,
          score: rating,
          tags: ['none']
        });
      }

      user.beenList = beenList;
      const result = await user.save()
      res.locals.result = result;
      console.log(result);
      next();

    }

      catch (error) {
        const err = new Error('Error in UserController.saveplace: ' + error.message);
        return next(err);
      }
  },

  getrating: async (req, res, next) => {
    try {
      const { ssid } = req.cookies;
      const { place } = req.body;
      
      const user = await User.findOne({ _id: ssid });
      if (!user) {
        const err = new Error('Error in UserController.savedList: User not found');
        return next(err);
      }
      //get beenList from user, should be an array of IDs
      const { beenList } = user;
      
      // console.log(beenList);

      const result = {'rating': 0};

      beenList.forEach((location) => {
        // console.log('THE LOCATION IS')
        // console.log(location);
        // console.log('THE PLACE IS')
        // console.log(place)
        // console.log('the location id is ' + location.locationID)
        // console.log('the place id is ' + place);

        if (location.locationID == place) {
          console.log('MATCH OCCURRED')
          // console.log('THE LOCATION IS')
          // console.log(location);
          result.rating = location.score;
        }
      })



      // console.log('the result to be sent is' + result.rating)
      res.locals.result = result;
      // console.log('the rating is' + result.rating)
      next();
    }

      catch (error) {
        const err = new Error('Error in UserController.getrating: ' + error.message);
        return next(err);
      }
  },

  // authenticate user login
  // user credentials will be sent in the request body
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        const err = new Error('Error in UserController.login: User not found');
        return next(err);
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        const err = new Error('Error in UserController.login: Wrong password');
        return next(err);
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },

  //getting saved list from mongo
  savedList: async (req, res, next) => {
    try {
      const { ssid } = req.cookies;
      const user = await User.findOne({ _id: ssid });
      
      if (!user) {
        const err = new Error('Error in UserController.savedList: User not found');
        return next(err);
      }

      //get savedList from user, should be an array of IDs
      const { savedList } = user;
      // builds query
      let query = '';
      query += savedList[0];
      for(let i = 1; i < savedList.length; i++) {
        query += ` OR place_id = ${savedList[i]}`;
      }

      const savedPlaces = await db.query(`SELECT * FROM places2 WHERE place_id = ${query}`);
      
      res.locals.savedList = savedPlaces.rows;

      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },

  beenList: async (req, res, next) => {
    try {
      const { ssid } = req.cookies;
      const user = await User.findOne({ _id: ssid });
      
      if (!user) {
        const err = new Error('Error in UserController.savedList: User not found');
        return next(err);
      }

      //get beenList from user, should be an array of objects
      const { beenList } = user;

      let savedList = beenList.map((location)=> {
        return location.locationID;
      })

      let ratingList = beenList.map((location)=> {
        return location.score;
      })


      let query = '';
      query += savedList[0];
      for(let i = 1; i < savedList.length; i++) {
        query += ` OR place_id = ${savedList[i]}`;
      }
      const savedQuery = await db.query(`SELECT * FROM places2 WHERE place_id = ${query}`);

      const savedPlaces = savedQuery.rows;

      savedPlaces.forEach((element, index) => {
        element.rating = ratingList[index];
      })
      
      res.locals.beenList = savedPlaces;

      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  }
};


module.exports = UserController;
