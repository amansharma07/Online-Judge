






const handleAll=(req,res,db)=> {
	var a=new Date();
	console.log("hghmghmv");
	var bb=a.toISOString()
	console.log(bb);
	var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
	return db.select("*").from("problemset").join('contests','problemset.c_id','=','contests.c_id').where(
		"contests.date_con","<=", time
	)
	.then(problems => {
		res.json({prob:problems});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleAll:handleAll
	};
