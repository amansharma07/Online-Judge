

const handleProblem=(req,res,db)=> {
	const id=req.query.id;
	return db.select("*").from("problemset").where({
		p_id:id})
	.then(problem => {
		res.json({prob:problem});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleProblem:handleProblem
	};
