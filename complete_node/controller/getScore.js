

const handleScore=(req,res,db)=> {
	
	return db.select("u_id").sum("score").from("correct")
	.where("c_id","=",req.query.c_id).groupBy("u_id")
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
		handleScore:handleScore
	};
