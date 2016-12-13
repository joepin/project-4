const router = require('express').Router();
const userModel = require('../models/user.js');

function sendAsJSON(req, res, next) {
  res.json(res.data);
}

router.route('/login')
  .post(userModel.login, sendAsJSON);

router.route('/')
  .get(userModel.getUserData, sendAsJSON)
  .post(userModel.createUser, sendAsJSON);

module.exports = router;