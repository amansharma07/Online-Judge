import React,{Component} from 'react';
import Contest_q from '../contest_q/contest_q.js';
import Scroll from "../scroll/scroll";
import "./contest.css"
import Question from "../question/question"
import Editor from "../editor/editor"
import Timer from "../timer/timer"
import Leaderboard from "../leaderboard/leaderboard"



class Contest extends Component{
	constructor(props){
		super(props);
		this.state={
			route:"contest",
			contest:{
				c_id:"",
				c_name:"",
				date_con:"",
				start_at:"",
				end_at:""
			},
			questions:[],
			question:{},
			userSolved:new Set(),
			currentTime:"",
		}
	}
	componentDidMount=()=>{
		fetch(`http://localhost:3001/getContestInfo?id=${this.props.contestId}`)
		.then(res => res.json())
		.then((data)=>{
			this.setState({contest:data})
		})

		 fetch(`http://localhost:3001/getContestProblem?id=${this.props.contestId}`)
	    .then(res => res.json())
	    .then((data)=>{
	      this.setState({questions:data})
	    })
	    .catch(err => alert("try again")); 

	        fetch(`http://localhost:3001/getRight?u_id=${this.props.u_id}`)
		    .then(res=>res.json())
		    .then((data)=>{
		      let kk=new Set();
		      for(let i=0;i<data.length;i++){
		          kk.add(data[i].p_id);
		      }
		      this.setState({userSolved:kk});
		    })
		    .catch(err=>{alert("please reload")})


		fetch("http://localhost:3001/getTime")
	    .then(res => res.json())
	    .then(data=>{
	    	this.setState({currentTime:data});
	    })

		// const problems=[{id:1,name:"cows problem"},{id:2,name:"rat race"},{id:3,name:"fastest car"},{id:4,name:"road runner"}];
		// this.setState({questions:problems});
		// this.setState({name:"code milenga"})
	}
	onSubmitContest=(object)=>{
			console.log(object);
			let end=Date.parse(`${this.state.contest.date_con.substring(0,10)} ${this.state.contest.end_at}`);
			let present=Date.parse(this.state.currentTime)
			let mark=0;
			if(end<present)
				mark=1;

		    fetch("http://localhost:3001/checkContestProblem",{
		      method: 'post',
		      headers :{'Content-Type':'application/json'},
		      async:false,
		      body :JSON.stringify({
		        data:object.text,
		        lang:object.lang,
		        p_id:this.state.question.p_id,
		        c_id:this.props.contestId,
		        u_id:this.props.u_id,
		        mark:mark,
		        score:500
		        // questionId:this.props.Problem.id,
		        // contestId:this.props.contest.id;

		      })
		    }).then(res => res.json())
		    .then(data=> console.log(data))
		    .catch(err => console.log(err));
	}
	openProblem=(id)=>{



		fetch(`http://localhost:3001/getProblem?id=${id}`)
	    .then(res => res.json())
	    .then((data)=>{
	      console.log(data);
	      this.setState({question:data.prob[0]});
	      this.setState({route:"problem"});
	      console.log(data);
	    })
	    .catch(err => alert("try again")); 

	}
	routeChange=(text)=>{
		this.setState({route:text})
	}

	render(){
		let end=Date.parse(`${this.state.contest.date_con.substring(0,10)} ${this.state.contest.end_at}`);
		let present=Date.parse(this.state.currentTime)
		let start=Date.parse(`${this.state.contest.date_con.substring(0,10)} ${this.state.contest.start_at}`);
		if(this.state.route==='contest'){
			const comp=[]
			for(let i=0;i<this.state.questions.length;i++){
				if(this.state.userSolved.has(this.state.questions[i].p_id))
					comp.push(<Contest_q key={this.state.questions[i].p_id} id={this.state.questions[i].p_id} name={this.state.questions[i].p_name} isAccepted={1} problemC={this.openProblem} />)
				else
					comp.push(<Contest_q key={this.state.questions[i].p_id} id={this.state.questions[i].p_id} name={this.state.questions[i].p_name} isAccepted={0} problemC={this.openProblem} />)

			}
			return(
				<div >

					<legend className="f1 fw6 ph0 mh0 center">{this.state.contest.c_name}</legend>
					<div className="navbars">
						<a onClick={()=>this.routeChange("contest")} >problems</a>
						<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
					</div>
					{present<=end?
					<div className="pv3" >
						<div style={{display:"flex"}}>
						<table  style={{width:"60%"}}>
							<tbody>
								<tr  className="new">
									<td  className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
									<td  className="ba bw1 pointer" style={{width:"85%"}}>PROBLEM</td>
									<td className="ba bw1" style={{width:"5%"}} >AC</td>
								</tr>
									{comp}
							</tbody>
						</table>
						<Timer style={{width:"40%"}} time={end-present} routeChanger={this.props.routeChanger}/>
						</div>
					</div>
					:
					<div className="pv3" >
						<table  style={{width:"100%"}}>
							<tbody>
								<tr  className="new">
									<td  className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
									<td  className="ba bw1 pointer" style={{width:"85%"}}>PROBLEM</td>
									<td className="ba bw1" style={{width:"5%"}} >AC</td>
								</tr>
									{comp}
							</tbody>
						</table>
					</div>}
				</div>

			);
		}
		else if(this.state.route==="problem"){

		    return(
		      <div>
			  <legend className="f1 fw6 ph0 mh0 center">{this.state.contest.c_name}</legend>
     		  <div className="navbars">
					<a onClick={()=>this.routeChange("contest")} >problems</a>
		     		<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
		      </div>
		      {present>end?
	          <div>
	            <Question name={this.state.question.p_name} question={this.state.question.question} input={this.state.question.input_form} output={this.state.question
	           	.output_form} input1={this.state.question.sample_ip} output1={this.state.question.sample_op} />
	            <Editor onSubmit={this.onSubmitContest} />
	          </div>
	          :
	          	<div>
	          	<div style={{display:"flex"}}>
	            	<Question style={{width:"60%"}} name={this.state.question.p_name} question={this.state.question.question} input={this.state.question.input_form} output={this.state.question
	            	.output_form} input1={this.state.question.sample_ip} output1={this.state.question.sample_op} />
	            	<Timer style={{width:"40%"}} time={end-present} routeChanger={this.props.routeChanger} />
	            </div>
	            <Editor onSubmit={this.onSubmitContest} />
	            </div>
	           }	          
	          </div>
          	);
		}
		else{
			return(
			<div>
			  <legend className="f1 fw6 ph0 mh0 center">{this.state.contest.c_name}</legend>
     		  <div className="navbars">
					<a onClick={()=>this.routeChange("contest")} >problems</a>
		     		<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
		      </div>
			<Leaderboard contestId={this.state.contest.c_id} />
			</div>
			)
		}
	}
}
export default Contest;








