const os = require('os');

const interfaces = os.networkInterfaces();

const validInterfaces = /(en)/gi;
const validMacs = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
const invalidMacs = /^(?:[0]{2}[:-]){5}[0]{2}|(?:[F]{2}[:-]){5}[F]{2}$/;

const allMacs = [];

for (key in interfaces) {
  if (validInterfaces.test(key)) {
    let nic = interfaces[key][0];
    if (!invalidMacs.test(nic.mac) && validMacs.test(nic.mac)) allMacs.push({ interface: key, mac: nic.mac});
  }
}


function getMacs() {
  return allMacs[0].mac;
}

module.exports = getMacs;
