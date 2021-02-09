const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "eu-cdbr-west-03.cleardb.net",
    user: "b2b69d7a7cdafd",
    password: "967e57da",
    database: "heroku_f3c9d4a49ca0132",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//Select Query wich would send in result attempting to url /api/get
app.get('/api/get', (req, res)=>{

    const sqlDisplayAll = "SELECT * FROM crew_members";
    db.query(sqlDisplayAll, (err, result)=>{
        if(err) throw err;
        res.send(result);
        console.log(result);
    });
});

app.post('/api/insert', (req, res) => {

    const newMember = req.body.newMember;

    const sqlQueryInsert = "INSERT INTO crew_members (crew_membername) VALUES (?)";
    db.query(sqlQueryInsert, newMember, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.listen(process.env.PORT || PORT, ()=> {
    console.log('Running on port ${PORT}');
});

