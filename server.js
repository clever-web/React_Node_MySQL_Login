const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config({ path: './.env'});
const PORT = process.env.PORT || 8000;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE 
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

app.post('/api/login', async (req, res) => {
    const query = `SELECT employee_id FROM attendance where employee_id = '${req.body.employeeID}'`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        if (results.length == 1) {
            const query = `SELECT employee_id FROM employee where employee_id = '${req.body.employeeID}' AND status='active'`;
            db.query(query, (err, results) => {
                if (err) {
                  console.error('Error executing query:', err);
                  return;
                }
              
                if (results.length == 1) {
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const entryDate = `${year}-${month}-${day}`;

                    const entryTIme = now.toLocaleTimeString('en-US', { hour12: false });

                    const query = `UPDATE attendance SET entry_time='${entryTIme}', entry_date='${entryDate}' where employee_id='${req.body.employeeID}'`;
                    db.query(query);

                    res.json({result: 'Welcome ' + req.body.employeeID + ' successfully logged in', loggedIn: true })

                } else {
                    res.json({ result: 'Employee is not active now', loggedIn: false })
                }
            });
        } else {
            res.json({ result: 'Employee is not registered', loggedIn: false })
        }
    });
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
