






const handleGet=(req,res,db)=> {
	var a=new Date();
	var bb=a.toISOString()
	console.log(bb);
	var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`

	return db.select("*").from("contests").where(
		"date_con",">=", time
	)
	.then(contests => {
		let arr=[]
		for(let i=0;i<contests.length;i++){
			let start=Date.parse(`${contests[i].date_start}`)
			console.log(start)
			if(start<Date.parse(time)){
				arr.push(contests[i]);
			}
		}
		res.json({con:arr});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleGet:handleGet
	};
