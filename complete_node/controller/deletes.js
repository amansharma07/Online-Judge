const deleteHandler = (req,res,db) =>{
		const {email}=req.body;
		db.transaction(trx => {
			db("login").transacting(trx).where("email","=",email)
			.del()
			.then(() =>{
				return trx('users')
				.returning("*")
				.where("email","=",email)
				.del()
				.then(rest => {
				res.json(rest[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback);
		})
		.catch(err => res.status(400).json("error"));
		

}
	module.exports = {
		deleteHandler:deleteHandler
	};