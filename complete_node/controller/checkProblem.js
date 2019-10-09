var request = require('request');
const {c, cpp, node, python, java} = require('compile-run');

const handleCheck=(req,res,db)=> {
		const sourcecode = req.body.data;
	const id=21;
	console.log(req.body.data);
	return db.select("*").from("problemset").where({
		p_id:id})
	.then( problem => {
			let probs;
			console.log(problem);
			probs=problem[0];
			return probs;
	})
	.then(async (probs)=>{
				let resultPromise;
				if(req.body.lang==='c')
					resultPromise = c.runSource(sourcecode,{ stdin:`${probs.actual_ip}` });
				else if(req.body.lang==='java')
					resultPromise = java.runSource(sourcecode,{ stdin:`${probs.actual_ip}` });
				else if(req.body.lang==='javascript')
					resultPromise = javascript.runSource(sourcecode,{ stdin:`${probs.actual_ip}` });
				else
					resultPromise = python.runSource(sourcecode,{ stdin:`${probs.actual_ip}` });
				console.log(probs);
				resultPromise
	    		.then(result => {
		        console.log("bhoolaa",result);
				if((result.stderr))
					res.json(result.errorType);
				else{
					kk=result.stdout.split("\n");
					ll=probs.actual_op.split("\\n");
					console.log(ll);
					console.log(kk);
					var flag=0;
					for(var i=0;i<ll.length;i++){
						t1=ll[i].split(" ");
						t2=kk[i].split(" ");
						if(t1.length!=t2.length){
							flag=1;
							break;
						}
						for(var j=0;j<t1.length;j++){
							if(t1[j].localeCompare(t2[j])!=0){
								flag=1;
								break;
							}
						}
					}
					if(flag===0 ){
						db("correct").where("u_id","=",req.body.u_id)
						.andWhere("p_id","=",req.body.p_id).then((data)=>{if (data.length==0){db("correct").insert({u_id:req.body.u_id,p_id:req.body.p_id,c_id:req.body.c_id,score:0 }).then(()=>{})}})
						.catch(err => res.send(err));

						db("submissions").insert({u_id:req.body.u_id,c_id:req.body.c_id,p_id:req.body.p_id,corr_status:1,score:0 }).then(()=>{});
						res.json("correct answer");
					}
					else{
						db("submissions").insert({u_id:req.body.u_id,c_id:req.body.c_id,p_id:req.body.p_id,corr_status:0,score:0 }).then(()=>{});
						res.json("wrong answer");
					}
				}
		    	})
		    	.catch(err => {
		        	console.log(err);
		        	res.json(err);
		    	});

	})
	.catch(err=>{
		console.log("err");
		res.status(404).json("problem fetching problem");
	});
}



	module.exports = {
		handleCheck:handleCheck
	};
