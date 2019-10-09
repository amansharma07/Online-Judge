
const handleAllContests=(req,res,db)=> {

	return db.select("*").from("contests")
	.then((contests) => {
		console.log(contests);
		res.json({con:contests});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleAllContests:handleAllContests
	};
