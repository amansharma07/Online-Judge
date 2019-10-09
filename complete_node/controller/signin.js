


const signinHandler = (req,res,db,bcrypt) =>{
	const {email,password}=req.body;
	if(!email || !password){
		return res.status(400).json("incorrect password or email");
	}
	db.select('email','passwo').from('pass')
	.where("email","=",email)
	.then(data => {
		const isValid=((data[0].passwo).localeCompare(password))//bcrypt.compareSync(password,data[0].hash);
		if(isValid===0){
			return db.select("*").from("users")
			.where({email:email})
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json("unable to get user"))
		}
		else{
			res.status(400).json("wrong credentials");
		}
	})
	.catch(err => res.status(400).json("wrong credentials"))
}

	module.exports = {
		signinHandler:signinHandler
	};