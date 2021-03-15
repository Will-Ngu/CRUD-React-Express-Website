const sqlite3 = require('sqlite3').verbose();
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite Database. Congrats')
});
db.close((err) => {
  if (err) {
    return console.error(error.message)
  }
  console.log('Close the database connection')
});
