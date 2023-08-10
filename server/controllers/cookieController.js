const User = require('../../models/userModel');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    const date = new Date();
    date.setHours(date.getHours() + 0.5);
    res.cookie(
      'ssid',
      user._id,
      { httpOnly: true },
      { expires: date.toUTCString() }
    );
    res.locals.ssid = user._id;
    //console.log('cookie', res.cookies);
    return next();
  } catch {
    return next({ err: 'ssid cookie setting didnt work' });
  }
};

cookieController.getSSIDCookie = async (req, res, next) => {
  try {
    const { ssid } = req.cookies;
    const user = await User.findOne({ _id: ssid });
    //console.log('user', user);
    res.locals.username = user.username;
    return next();
  } catch {
    return next({ err: 'ssid cookie setting didnt work' });
  }
};
module.exports = cookieController;
