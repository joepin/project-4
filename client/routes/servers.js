const router = require('express').Router();
const auth = require('../lib/auth.js');
const serverModel = require('../models/server.js');
const { login } = require('../models/user.js');

function sendAsJSON(req, res, next) {
  res.json(res.data);
}

router.route('/register')
  .post(login, serverModel.getUserData, serverModel.checkIfServerIsRegistered, serverModel.generateUUID, serverModel.registerServer, serverModel.prepareResponse, sendAsJSON)
  .delete(auth.authenticate, serverModel.unregisterServer, sendAsJSON);

router.route('/start')
  .get(serverModel.saveServerURL, sendAsJSON);

router.route('/stop')
  .get(serverModel.deleteServerURL, sendAsJSON);

router.route('/')
  .get(auth.authenticate, serverModel.getUserServers, sendAsJSON)
  .post(auth.authenticate, serverModel.createUserServer, sendAsJSON);

module.exports = router;
