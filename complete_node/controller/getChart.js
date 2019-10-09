const handleChart=(req,res,db)=> {
		let kk;
		db.select("*").from("register").join('contests','contests.c_id','=','register.c_id')
		.where('register.u_id','=',req.query.u_id)
		.then((data)=>{
			let kk=data;
			return db.select("*").from("register").join('correct','correct.u_id','=','register.u_id')
			.whereRaw("correct.c_id = register.c_id")
			.andWhere("register.u_id",'=',req.query.u_id)
			.then((datas)=>{
        	let map={};
        	let sap={};
        	console.log(kk)
        	console.log(datas)
        	for(let i=0;i<kk.length;i++){
        		map[kk[i].c_id]=(Date.parse(kk[i].date_con)-Date.parse("2019-08-29 12:00:00"));
        		sap[kk[i].c_id]=0;
        	}
        	console.log(map)
        	for(let i=0;i<datas.length;i++){
        		sap[datas[i].c_id]+=datas[i].score;

        	}
				trr={}
				for(let i in sap){
					trr[map[i]]=sap[i]
				}
				res.send(trr)
			});

		})
		.catch(err=>res.json(err))








 //        db.select('*')
 //        .from('contests')
 //        //         
 //        .leftJoin(('register'),
 //            function () {
 //                this.on('register.c_id', '=', 'contests.c_id');
 //            })
 //        .leftJoin(
 //        	db("correct").where('u_id','=',req.query.u_id).as('t3'),
 //        	function(){
 //        		this.on('register.u_id','=','t3.u_id')
 //        	}).whereRaw(`register.u_id = ${req.query.u_id}`)
 //        .then(problems => {
 //        	let map={};
 //        	console.log(problems)
 //        	for(let i=0;i<problems.length;i++){
 //        		if((Date.parse(problems[i].date_con)-Date.parse("2019-08-29 12:00:00")) in map){
 //        			if(problems[i].score===null)
 //        				map[(Date.parse(problems[i].date_con)-Date.parse("2019-08-29 12:00:00"))]+=0;
 //        			else
 //        				map[(Date.parse(problems[i].date_con)-Date.parse("2019-08-29 12:00:00"))]+=problems[i].score;
 //        		}
 //        		else{
 //        			if(problems[i].score===null)
 //        				 map[(Date.parse(problems[i].date_con)-Date.parse("2019-08-29 12:00:00"))]=0;
 //        			else
 //        				map[(Date.parse(problems[i].date_con)-Date.parse("2019-08-29 12:00:00"))]=problems[i].score;
 //        		}
 //        	}
        	
	// 		res.json(problems);}
	// ).catch(err => {
	// 	res.status(404).json("problem fetching problem");
	// });




	return db.select("*").from("register").join("contests","contests.c_id","=","register.c_id").join("correct","correct.c_id","=","contests.c_id")
	.where("register.u_id","=",1)
	
	
}

	module.exports = {
		handleChart:handleChart
	};
