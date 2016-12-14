const os = require('os');

const interfaces = os.networkInterfaces();

const validInterfaces = /(en)/gi;
const validMacs = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
const invalidMacs = /^(?:[0]{2}[:-]){5}[0]{2}|(?:[F]{2}[:-]){5}[F]{2}$/;

const allMacs = [];

for (key in interfaces) {
  if (validInterfaces.test(key)) {
    let protocol = interfaces[key][0];
    if (!invalidMacs.test(protocol.mac) && validMacs.test(protocol.mac)) allMacs.push({ interface: key, mac: protocol.mac});
  }
}

module.exports = allMacs[0].mac;
