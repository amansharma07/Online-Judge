






const handleGet=(req,res,db)=> {

return db.select("*").from("comment").where("p_id","=",req.query.p_id)
.then((data)=>{
	console.log("pp");
	res.json(data)})
.catch(err=>res.json(err))
	
}

	module.exports = {
		handleGet:handleGet
	};
