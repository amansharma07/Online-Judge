

const handleProfile=(req,res,db)=> {
	const {id}=req.params;
	return db.select("*").from("users").where({
		id:id})
	.then(user => {
		if(user.length){
			res.json(user[0]);}
		else{
			res.status(404).json("no such usser");}
	}).catch(err => {
		res.status(404).json("no such usser");
	});
	
}

	module.exports = {
		handleProfile:handleProfile
	};
