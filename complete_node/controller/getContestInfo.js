

const handleContestInfo=(req,res,db)=> {
	const id=req.query.id;
	console.log("from handleContestInfo")
	return db.select("*").from("contests").where({
		c_id:id})
	.then(contest => {

		res.json(contest[0]);
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleContestInfo:handleContestInfo
	};
