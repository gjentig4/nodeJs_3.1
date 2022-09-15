const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const url = require("url");
let sql;
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database('./cars.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

app.use(bodyParser.json());

app.post('/', (req, res) => {
    try {
        console.log(req.body.brand);
        const { brand, model, year } = req.body;
        sql = "INSERT INTO cars (brand,model,year) VALUES (?,?,?)";
        db.run(sql, [brand, model, year], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err });
            console.log("successful input", brand, model, year);
        });
        return res.json({
            status: 200,
            success: true,
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
})

app.get("/", async (req, res) => {
    sql = "SELECT * FROM cars";
    try {
        db.all(sql, [], (err, rows) => {
            //if (err) return console.log(err)
            return res.json({ status: 200, data: rows, success: true, error: err });
        });
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
        })
    }
});


app.get("/makes/:make", (req, res) => {
    const make = [req.params.make];
    sql = "SELECT * FROM cars WHERE brand = ?";
    try {
        db.all(sql, [make], (err, rows) => {
            return res.json({ status: 200, data: rows, success: true, error: err });
        });
        //db.close();
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
        })
    }
});


app.get('/:carID', async (req, res) => {
    const car_id = [req.params.carID]
    sql = "SELECT * FROM cars WHERE ID = ?"
    try {
        db.get(sql, [car_id], (err, rows) => {
            return res.json({ status: 200, data: rows, success: true, error: err });
        });
        //db.close();
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
        })
    }
})

app.delete('/:carID', async (req, res) => {
    const car_id = [req.params.carID];
    sql = "DELETE FROM cars WHERE ID = ?"
    try {
        db.run(sql, [car_id], (err, rows) => {
            if (err) return console.log(err);
            return res.json({ status: 200, data: rows, success: true });
        });
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
        })
    }
})






app.listen(3000);


