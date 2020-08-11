const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '15266f8e645041bdbb167129f6bfc1b2'
});

const hapi = (req,res) => {
	app.models
   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data => {
   	res.json(data);
   })
   .catch(err => res.status(400).json('api not working'))
} 


const handle = (req,res,db)=>{

   db('users')
  .where('id', '=', req.body.id)
  .increment('entries', 1)
  .returning('entries')
  .then(entry=>
  	res.json(entry[0]))
  .catch(err => res.status(400).json('erroorrr updating entry')) 
}

module.exports = {
	handle:handle,
	hapi:hapi
}