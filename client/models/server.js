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

module.exports = {
  getUserServers,
}
