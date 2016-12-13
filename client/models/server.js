const db = require('../lib/dbConnect.js');

function getUserServers(req, res, next) {
  const userID = res.userData.user_id;
  const query = `SELECT * FROM server WHERE user_id = $1;`;
  const values = [userID];

  db.any(query, values)
  .then(data => res.data = data)
  .then(() => next())
  .catch(err => next(err));
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
