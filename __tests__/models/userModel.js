/*





Note, oliver is hardcoded in Mongo_URI for this js file. might cause issues if there's
ever a merge to outside our groups version of this project
suggestion:make both username and password .env variables



*/

const User = require('../../models/userModel');

describe('testing the functionality setup in userMode.js', () => {
  //maybe a test should be provided to test the mongoose connection itself

  describe('testing a simple get requests to make sure we can pull from server', () => {
    //requires a get
  });

  describe('testing a valid User post request to confirm posting can happen', () => {
    //requires a post
  });
  describe('testing an invalid User post request to confirm posting can happen ', () => {
    //requires a post
  });

  describe('testing a valid User patch request to confirm posting can happen ', () => {
    //requires a patch, , and maybe a true on return updated Version
  });
  describe('testing a valid User delete request to confirm posting can happen ', () => {
    //requires a delete
  });
});
