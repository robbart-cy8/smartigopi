const handle = (req,res,db,bcrypt) =>{
	db.select('email','hash').from('login')
	.where('email','=',req.body.email)
	.then(data=>{
		const isTrue = bcrypt.compareSync(req.body.password, data[0].hash);
		if (isTrue){
			return db.select('*').from('users')
					.where('email','=',req.body.email)
					.then(user=>{
						res.json(user[0]);
					})
					.catch(err => res.status(400).json('erroorrr not matching1'))
		} else{
			res.status(400).json('erroorrr not matching2')
		}
	})
	.catch(err =>res.status(400).json('erroorrr not matching3'))
}

module.exports={
	handle:handle
}