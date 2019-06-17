const bycrypt = require('bcrypt-nodejs');
const setting = require('./config/setting');
console.log(bycrypt.hashSync('123456', null, null).toString())