const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const SELECT_ALL_STOCKS_QUERY = 'SELECT * FROM stocks';
const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root',
     database: 'investing_db'
});

connection.connect(err => {
    if (err){
        return err;
    }
});

console.log(connection);
app.use(cors());

app.get('/', (req,res) => {
    res.send('go to /products')
});

app.get('/stocks', (req,res) => {
    connection.query(SELECT_ALL_STOCKS_QUERY, (err,results) => {
        if (err){
            return res.send(err);
        }
        else{
            return res.json({
                data: results
            })
        }
    });
})

app.listen(4000, () => {
    console.log('Investing101 server listening on port 4000 ')
});