/**
 * Testing userController.js
 *
 */

const userController = require('../../server/controllers/userController');

describe('testing all the methods found in userController.js, found in controllers folder', () => {
  //probably needs a get method used, e.g. User.findOne()/Places.findOne(), forEach()

  describe('#signup', () => {});

  describe('#saveplace', () => {});
  //note- there are 2 'saveplace' methods in userController
  //i can't tell the difference of how their called.
  //first 1 might be overwritten
  describe('#rateplace', () => {});
  describe('#login', () => {});
  describe('#savedList', () => {});
  describe('#beenList', () => {});
});

//the other routes need testing too
