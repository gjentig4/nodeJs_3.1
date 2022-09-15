const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./cars.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

const sql = `CREATE TABLE cars (ID INTEGER PRIMARY KEY, brand, model, year)`;

db.run(sql);

//node table.js