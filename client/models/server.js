const db = require('../lib/dbConnect.js');
const auth = require('../lib/auth.js');
const uuid = require('uuid');

function getUserServers(req, res, next) {
  const userID = res.userData.user_id;
  const query = `SELECT * FROM server WHERE user_id = $1;`;
  const values = [userID];

  db.any(query, values)
  .then(data => res.data = data)
  .then(() => next())
  .catch(err => next(err));
}

function getUserData(req, res, next) {
  auth.getUserData(res.token)
  .then(user => res.userData = user)
  .then(() => next())
  .catch(err => next(err));
}

function checkIfServerIsRegistered(req, res, next) {
  const mac = req.body.mac;
  const normalizedMac = mac.replace(/(:|-)/g, '');
  res.normalizedMac = normalizedMac;

  const query = `SELECT * FROM "server" WHERE server_id = $1;`;
  const values = [normalizedMac];

  db.any(query, values)
  .then(data => data ? next(new Error('Computer is already registered.')) : next())
  .catch(err => next(err));
}

function generateUUID(req, res, next) {
  const mac = req.body.mac;
  const userID = res.userData.user_id;
  const normalizedMac = mac.replace(/(:|-)/g, '');
  const macArray = normalizedMac.split('');
  const idArray = userID.toString().split('');
  const together = macArray.concat(idArray);
  const random = together.map((value) => parseInt('0x' + value));
  const generatedUUID = uuid.v4({ random: random });
  res.generatedUUID = generatedUUID;
  next();
}

function registerServer(req, res, next) {
  const userID = res.userData.user_id;
  const serverName = req.body.name;
  const serverMac = res.normalizedMac;
  const serverUUID = res.generatedUUID;

  const query = `INSERT INTO "server" (server_name, server_mac, server_uuid, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [
    serverName,
    serverMac,
    serverUUID,
    userID,
  ];

  db.one(query, values)
  .then(server => res.insertedServer = server)
  .then(() => next())
  .catch(err => next(err));
}

function prepareResponse(req, res, next) {
  res.data = {
    user_data: res.userData,
    server_data: res.insertedServer,
  }
  next();
}

function createUserServer(req, res, next) {
  const name = req.body.name;
  const url = req.body.url || null;
  const userID = res.userData.user_id;

  const query = `INSERT INTO server (server_name, server_url, user_id) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [
    name,
    url,
    userID,
  ];

  db.one(query, values)
  .then((server) => res.data = server)
  .then(() => next())
  .catch(err => next(err));
}

function unregisterServer(req, res, next) {
  res.data = 'this method is under construction';
  next();
}

module.exports = {
  getUserServers,
  getUserData,
  checkIfServerIsRegistered,
  generateUUID,
  registerServer,
  prepareResponse,
  createUserServer,
  unregisterServer,
}
