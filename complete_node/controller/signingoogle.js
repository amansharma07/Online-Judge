const signinHandler = (req,res,db,bcrypt) =>{
	const {email,googleId,handle,institute,name}=req.body;
	console.log(req.body)
	db.select("*").from("google").where('email','=',email).then((datas)=>{
	console.log("datas",datas)
	if(datas.length===0){
		db('google').insert({email:req.body.email,googleid:req.body.googleId}).then(()=>{
		db('users').insert({u_name:name,email:email,handle:handle,institution:institute,joined_date:new Date()}).then(()=>{
		db.select('email','googleid').from('google')
		.where("email","=",email)
		.then(data => {
			const isValid=0;
			if(isValid===0){
				return db.select("*").from("users")
				.where("email","=",email)
				.then(user => {
					console.log(user[0])
					res.json(user[0])
				})
				.catch(err => res.status(400).json("unable to get user"))
			}
			else{
				res.status(400).json("wrong credentials");
			}
		})})})
		.catch(err => {		
			res.json("User Registered, Sign In again with Google")})}
	else{
		console.log("helllloooooo")
		db.select("*").from("users").where('email','=',email)
		.then((data)=>res.json(data[0]));
	}
}).catch(err=>console.log("please try again"))
	//res.json("aaaaaaaaa")
}

	module.exports = {
		signinHandler:signinHandler
	};