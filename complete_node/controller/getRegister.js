

const handleRegister=(req,res,db)=> {
	
	return db.select("users.u_id","users.handle").from("users").join("register","register.u_id","=","users.u_id")
	.where("register.c_id","=",req.query.c_id)
	.then(data=>{
		res.send(data);
	})

	// const id=req.query.id;
	// return db.select("*").from("problemset").where({
	// 	p_id:id})
	// .then(problem => {
	// 	res.json({prob:problem});
	// }).catch(err => {
	// 	res.status(404).json("problem fetching problem");
	// });
	
}

	module.exports = {
		handleRegister:handleRegister
	};
