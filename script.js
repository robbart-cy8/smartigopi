const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');


const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');


const db = knex({
  client: 'pg',
  connection: { 
    host : '127.0.0.1',
    user : 'postgres',
    password : 'asdf!@#$',
    database : 'genius'
  }
});



const app = express();

app.use(bp.json());
app.use(cors());


//Endpoints
app.get('/', (req,res) =>{ res.send('workingggg!')})
app.post('/signin', (req,res) =>{ signin.handle(req,res,db,bcrypt) } )
app.post('/register', (req,res) => { register.handle(req,res,db,bcrypt) } )
app.put('/image', (req,res) => { image.handle(req,res,db) })
app.post('/imageurl', (req,res) => { image.hapi(req,res) })

app.listen( process.env.PORT || 3000, () => {
	console.log('peace mate.. carry on!')
})