'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Quycua1506",
  database: process.env.DB_NAME || "evaluation360"
});

module.exports = db
module.exports = db