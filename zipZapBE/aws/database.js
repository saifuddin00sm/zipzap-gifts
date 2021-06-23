let appSettings = require("./appSettings.json");
const { Pool } = require("pg");

const DB_USER = appSettings.databaseToggle.productionDatabase
  ? process.env.PROD_DB_USER
  : appSettings.databaseToggle.devDatabase
  ? process.env.DEV_DB_USER
  : process.env.POSTGRES_USER;
const DB_HOST = appSettings.databaseToggle.productionDatabase
  ? process.env.PROD_DB_HOST
  : appSettings.databaseToggle.devDatabase
  ? process.env.DEV_DB_HOST
  : process.env.POSTGRES_HOST;
const DB_NAME = appSettings.databaseToggle.productionDatabase
  ? process.env.PROD_DB_NAME
  : appSettings.databaseToggle.devDatabase
  ? process.env.DEV_DB_DB
  : process.env.POSTGRES_DB;
const DB_PASS = appSettings.databaseToggle.productionDatabase
  ? process.env.PROD_DB_PASS
  : appSettings.databaseToggle.devDatabase
  ? process.env.DEV_DB_PASSWORD
  : process.env.POSTGRES_PASSWORD;
const DB_PORT = appSettings.databaseToggle.productionDatabase
  ? process.env.PROD_DB_PORT
  : appSettings.databaseToggle.devDatabase
  ? process.env.DEV_DB_PORT
  : process.env.POSTGRES_PORT;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});
module.exports = {
  query: async (text, params, rowMode) => {
    const start = Date.now();
    let queryResult = { error: false, rows: null, rowCount: 0 };
    let query = {
      text: text,
      values: params,
      rowMode: rowMode ? rowMode : "",
    };
    try {
      const duration = Date.now() - start;
      const res = await pool.query(query);

      queryResult.rows = res.rows;
      queryResult.rowCount = res.rowCount;
      // console.log("executed query", {
      //   // text,
      //   params,
      //   duration,
      //   rows: res.rowCount,
      // });
    } catch (err) {
      queryResult.error = err;
    }

    return queryResult;
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done);
    });
  },
};
