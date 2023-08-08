const User = require('../../models/userModel');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({username})
      const date = new Date()
      date.setHours(date.getHours() + .5)
      res.cookie('ssid', user._id, { httpOnly: true }, {expires: date.toUTCString()});
      res.locals.ssid = user._id;
      return next();  
    }
    catch {
      return next({err: 'ssid cookie setting didnt work'})
    }
  }
  module.exports = cookieController;