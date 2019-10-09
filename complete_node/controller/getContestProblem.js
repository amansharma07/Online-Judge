






const handleContestProblem=(req,res,db)=> {
	console.log("hghmghmv");
	return db.select("*").from("problemset").join('contests','problemset.c_id','=','contests.c_id').where(
		"contests.c_id","=", req.query.id
	)
	.then(problems => {
		console.log("problems");
		res.json(problems);
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleContestProblem:handleContestProblem
	};
