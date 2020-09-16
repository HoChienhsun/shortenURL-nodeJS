var util = require('util')
var config = require('config');
var mysql = require('mysql');
const sqlconfig = config.get('rdsconnection');


var connection = mysql.createConnection({
  host: sqlconfig.get("host"),
  port: sqlconfig.get("port"),
  user: sqlconfig.get("user"),
  password: sqlconfig.get("password"),
  database : sqlconfig.get("database"),
  insecureAuth : true
});

connection.connect(function(err) {
  if (err) {
    console.trace('fatal error: ' + err.message);
    return 
  }
  console.log("MySQL is connected!");
});
connection.query = util.promisify(connection.query);

module.exports = connection;


