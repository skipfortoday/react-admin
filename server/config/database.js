//create database connection
const mysql = require("mysql");

// Create a connection to the database
// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "lviors_absensi",
//   password: "lv1ors_absensi",
//   database: "lviors_absensi",
//   timezone: "utc"
// });

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "absensi_dev",
  timezone: "utc"
});

// open the MySQL connection
conn.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = conn;



//const asyncQuery = util.promisify(conn.query).bind(conn);