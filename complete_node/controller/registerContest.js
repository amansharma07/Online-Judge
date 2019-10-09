






const handleRegister=(req,res,db)=> {
console.log("here",req)
	db.select("*").from("register").where('c_id','=',req.query.c_id).andWhere('u_id','=',req.query.u_id)
	.then((data)=>{
		if(data.length===0){
			db("register").insert({u_id:req.query.u_id,c_id:req.query.c_id}).then((data)=>res.json("success"));
		}
		else{
			res.json("success");
		}
	})
	.catch(err=>res.json("error"))	
	
}

	module.exports = {
		handleRegister:handleRegister
	};
