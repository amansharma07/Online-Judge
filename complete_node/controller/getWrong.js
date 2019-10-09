






const handleWrong=(req,res,db)=> {
	var a=new Date();
	var bb=a.toISOString()
	console.log("go to hell");
	var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
	return db.distinct('submissions.p_id','problemset.p_name').from("submissions").join("problemset","submissions.p_id","=","problemset.p_id").where(
		"submissions.u_id","=",req.query.u_id
	).andWhere("submissions.corr_status","=",0)
	.then(problems => {
		console.log(problems)
		res.json({prob:problems});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleWrong:handleWrong
	};
