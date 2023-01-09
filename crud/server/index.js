const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const bodyparser = require('body-parser');
const mycon = require('mysql');

const app = express();
app.use(cors());
app.use(fileupload());
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

let c = mycon.createConnection({
    host : "localhost",
    port : "3306",
    user : "root",
    password : "Divya@divi20",
    database : "radical"
})

c.connect(function(error){
    if(error){console.log(error);}
    else{console.log('Database Connected');}
})

app.post('/Add',(request,response)=>{

    let {firstname,lastname,email,dob,education,location,about} = request.body;

    let sql = 'insert into students(firstname,lastname,email,dob,education,location,about,status) values (?,?,?,?,?,?,?,?)';

    c.query(sql,[firstname,lastname,email,dob,education,location,about,0],(error,result)=>{
        if(error){
            let s = {"status":"error"}
            response.send(s);
        }
        else{
            let s = {"status":"Success"};
            response.send(s);
        }
    })
})


app.get('/Studetails',(request,response)=>{

    let sql = 'select * from students';

    c.query(sql,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })

})

app.post('/Delete',(request,response)=>{
    let id = request.body.id;
    let sql = 'delete from students where id=?';
    c.query(sql,[id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"Success"};
            response.send(s);
        }
    })
})

app.listen(3002, ()=>{console.log('Server running on port no : 3002')});