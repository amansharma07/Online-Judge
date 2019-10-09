const express=require("express");
const app=express();
const bcrypt=require("bcrypt-nodejs");
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.json());
app.use(cors())
const signingoogle=require("./controller/signingoogle")
const knex=require('knex')
const register=require('./controller/register');
const signin=require("./controller/signin")
const profile=require("./controller/profile");
const image=require("./controller/image");
const deletes=require("./controller/deletes");
const problem=require("./controller/problem");
const allProblem=require("./controller/allProblem")
const searchProblem=require("./controller/searchProblem")
const checkProblem=require("./controller/checkProblem")
const getContest=require("./controller/getContest")
const getWrong=require("./controller/getWrong")
const getRight=require("./controller/getRight")
const getAllContests=require("./controller/getAllContests")
const getContestInfo=require("./controller/getContestInfo")
const getContestproblem=require("./controller/getContestproblem")
const getTime=require("./controller/getTime")
const checkContestProblem=require("./controller/checkContestProblem")
const getRegister=require("./controller/getRegister")
const getScore=require("./controller/getScore")
const getChart=require("./controller/getChart")
const getData=require("./controller/getData")
const setData=require("./controller/setData")
const registerContest=require("./controller/registerContest")


const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'user',
    database : 'oj'
  }
});

var request = require('request');
dbs={input:"4 5\n6 7\n8 9",output:"9\n13\n17\n",memory:"3000",time:"1.000"}




app.get('/',(req,res)=>{
	res.json(db.user);
});

app.post('/delete',(req,res)=>{deletes.deleteHandler(req,res,db)})
app.post('/signin',(req,res)=>{signin.signinHandler(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put("/image",(req,res)=>{image.handleImage(req,res,db)})
app.post("/imageurl",(req,res) => {image.handleApiCall(req,res)})
app.get("/getProblem",(req,res)=>{problem.handleProblem(req,res,db)})
app.get("/getAProblems",(req,res)=>{allProblem.handleAll(req,res,db)})
app.get("/getSearch",(req,res)=>{searchProblem.handleSearch(req,res,db)})
app.post("/checkProblem",(req,res)=>{checkProblem.handleCheck(req,res,db)})
app.get("/getContest",(req,res)=>{getContest.handleGet(req,res,db)})
app.get("/getWrong",(req,res)=>{getWrong.handleWrong(req,res,db)})
app.get("/getRight",(req,res)=>{getRight.handleRight(req,res,db)})
app.get("/getAllContests",(req,res)=>{getAllContests.handleAllContests(req,res,db)})
app.get("/getContestInfo",(req,res)=>{getContestInfo.handleContestInfo(req,res,db)})
app.get("/getContestproblem",(req,res)=>{getContestproblem.handleContestProblem(req,res,db)})
app.post("/checkContestProblem",(req,res)=>{checkContestProblem.handleContestCheck(req,res,db)})
app.get("/getTime",(req,res)=>{getTime.handleTime(req,res,db)})
app.get("/getRegister",(req,res)=>{getRegister.handleRegister(req,res,db)})
app.get("/getScore",(req,res)=>{getScore.handleScore(req,res,db)})
app.get("/getChart",(req,res)=>{getChart.handleChart(req,res,db)})
app.get("/getData",(req,res)=>{getData.handleGet(req,res,db)})
app.post("/setData",(req,res)=>{setData.handleSet(req,res,db)})
app.get("/registerContest",(req,res)=>{registerContest.handleRegister(req,res,db)})
app.post("/signingoogle",(req,res)=>{signingoogle.signinHandler(req,res,db,bcrypt)})
app.get("/getQuery",(req,res)=>{
	let k1=req.query.url;
	let k3=k1.split('?');
  	res.send(k3[0]);
})

app.listen(3001,()=>{
	console.log("running port 3001");
});
