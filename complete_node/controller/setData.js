






const handleSet=(req,res,db)=> {
console.log("here",req)
	db("comment").insert({id:req.body.comment.id,p_id:req.body.comment.p_id,author:req.body.comment.author,text:req.body.comment.text}).then((data)=>res.json(data));
	
	
}

	module.exports = {
		handleSet:handleSet
	};
