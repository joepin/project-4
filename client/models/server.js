const db = require('../lib/dbConnect.js');
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

function test(mac, userID) {
  const normalizedMac = mac.replace(/(:|-)/g, '');
  const macArray = normalizedMac.split('');
  const idArray = userID.toString().split('');
  const together = macArray.concat(idArray);
  const random = together.map((value) => '0x' + value);
}

function getServerUUID(req, res, next) {
  const mac = req.body.mac;
  // TODO: make this line correct
  const userID = req.body.userID;
  const normalizedMac = mac.replace(/(:|-)/g, '');
  const macArray = normalizedMac.split('');
  const idArray = userID.toString().split('');
  const together = macArray.concat(idArray);
  const random = together.map((value) => parseInt('0x' + value));
  const generatedUUID = uuid.v4({ random: random });
  res.generatedUUID = generatedUUID;
  next();
}

function checkIfServerIsRegistered(req, res, next) {

}

function registerServer(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const serverName = req.body.name;
  const serverMac = req.body.mac;

  const query = `INSERT INTO `
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

module.exports = {
  getUserServers,
  createUserServer,
}
