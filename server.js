const express = require('express');                 //Using express framework to handle routing bridge between Frontend and Backend and createServer
const bodyParser = require('body-parser');          //Using to parse request body
const cors = require('cors');                       //Using  to handle Cross Origin coming from Backend(Heroku) and Frontend(Netifly)
const mysql = require('mysql');                     //Using mysql pluggin to connect Database comming from heroku and handling with ClearDB
const helmet = require('helmet');                   //Secure CSP, X-content-type-opt, X-frame-opt, X-XSS protec
const app = express();

const db = mysql.createPool({
    host: "*********",
    user: "*********",
    password: "********",
    database: "********",
});


//Applicate all middleWare: CORS for clean Header
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());


//Select Query wich fetch all crew_members table and send to the front by '/api/get'
//Throwing an Array of Object
app.get('/api/get', (req, res)=>{

    const sqlDisplayAll = "SELECT * FROM crew_members";
    db.query(sqlDisplayAll, (err, result)=>{
        if(err) throw err;
        res.send(result);
        console.log(result);
    });
});

//Insert Query from frontend Input and writing on the crew_member table
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

