
const Clarifai=require("clarifai");

const app = new Clarifai.App({
 apiKey: 'ENTER UR API KEY'
});

const handleApiCall = (req,res) => {
 app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data => {
 	res.json(data);
 })
 .catch(err => {
 	res.status(400).json("fail to fetch")})
}

const handleImage = (req,res,db)=> {
	const {id}=req.body;
	db('users').where("id","=",id).increment('entries',1)
	.returning('entries')
	.then(resp =>{
		if(resp.length)
			res.json(resp[0]);
		else
			res.json("failed to fetch");
	}).catch(err => {
		res.status(400).json("bad request");
	});


}
	module.exports = {
		handleImage:handleImage,
		handleApiCall:handleApiCall
	};
