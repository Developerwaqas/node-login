const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path")
const cookieParser = require('cookie-parser');
const AlgoliaClient = require('./helpers/algolia-search');
const client = new AlgoliaClient();
dotenv.config({ path : './.env'})


const app= express();

//  client.addObjects('contacts', 'morobot')


const db = mysql.createConnection({
    host:process.env.DATABASE_HOST ,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
});

const pathDirectory = path.join(__dirname , './public')
console.log(__dirname);
app.use(express.static(pathDirectory));

// pages url encoded
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine' , 'hbs')

db.connect( (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MySql is connected Successfully...")
    }
})

// routing for pages
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));   

app.listen(4000, ()=>{
    console.log("Server started on Port 4000")
})