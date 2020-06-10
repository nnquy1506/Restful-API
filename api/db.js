'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "db4free.net",
  user: process.env.DB_USER || "the_nguyen",
  password: process.env.DB_PASSWORD || "Duythe1998@",
  database: process.env.DB_NAME || "evaluation_360"
});

module.exports = db