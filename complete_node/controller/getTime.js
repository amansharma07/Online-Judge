

const handleTime=(req,res)=> {
	
	var a=new Date();
	var bb=a.toISOString()
	var time=`${bb.substring(0,4)}/${bb.substring(5,7)}/${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
	res.json(time);

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
		handleTime:handleTime
	};
