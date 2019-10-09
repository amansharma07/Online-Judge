






const handleSearch=(req,res,db)=> {
	var a=new Date();
	var bb=a.toISOString()
	console.log(bb);
	var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
	var bbs=(req.query.tags.toLowerCase()).split(",");
	console.log(bbs);
	return db.select("*").from("problemset").join('contests','problemset.c_id','=','contests.c_id').join('tags','problemset.p_id','=','tags.p_id').where(
		"tags.tag","in",bbs
	).andWhere("contests.date_con","<", time)
	.then(problems => {
		res.json({prob:problems});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleSearch:handleSearch
	};
