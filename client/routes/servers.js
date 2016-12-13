const router = require('express').Router();
const auth = require('../lib/auth.js');
const serverModel = require('../models/server.js');

function sendAsJSON(req, res, next) {
  res.json(res.data);
}

router.route('/')
  .get(auth.authenticate, serverModel.getUserServers, sendAsJSON)
  .post(auth.authenticate, serverModel.createUserServer, sendAsJSON);

module.exports = router;
