const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "jason_db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res)=>{

    const sqlDisplayAll = "SELECT * FROM crew_members";
    db.query(sqlDisplayAll, (err, result)=>{
        console.log(result);
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {

    const newMember = req.body.newMember;

    const sqlQueryInsert = "INSERT INTO crew_members (crew_membername) VALUES (?)";
    db.query(sqlQueryInsert, [newMember], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, ()=> {
    console.log('Running on port 3001');
});