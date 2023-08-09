/*
Testing api.js in routes folder
*/

//honestly, not sure if this needs Server.js required too
//or just app.use(express.json())
//i think it needs to be a real request, not a faked one
//made by declaring req.body = {some object}
//note- look up online

const api = require('../../server/routes/apiRouter');
describe('testing all the routes of apiRouter found in the routes folder', () => {
  //probably needs a get method used, e.g. User.findOne()/Places.findOne(), forEach()

  //tests run may need async await functionality
  //but also maybe not. since the controller methods
  //for each route have the required async await
  describe('/signup', () => {});

  describe('/login', () => {});
  describe('/beenList', () => {});
  describe('/savedList', () => {});
});

//the other routes need testing too
