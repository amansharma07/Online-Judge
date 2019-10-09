

const handleRegister = (req,res,db,bcrypt)=>{
	const {email,name,password,handle,institute}=req.body;
	if(!email || !name || !password || !handle || !institute){
		return res.status(400).json("incorrect password or email");
	}
		db.select("*").from('users').where('email','=',email).then((data)=>{
		if(data.length===0){
		db.transaction(trx => {
			db("pass").transacting(trx).insert({
				passwo:password,
				email:email
			}).
			returning('email').
			then(loginemail =>{
				return trx('users')
				.returning("*")
				.insert({
				email:loginemail[0],
				u_name:name,
				joined_date:new Date(),
				handle:handle,
				institution:institute
				})
				.then(rest => {
				res.json(rest[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback);
		})
		.catch(err => res.status(400).json("error"));
		}
		else{
			res.json("email exist");
		}
	}).catch(err=>console.log(err))
		
	}
	module.exports = {
		handleRegister:handleRegister
	};