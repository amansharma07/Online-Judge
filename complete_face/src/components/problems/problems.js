import React,{Component} from 'react';
import Card from '../problemCard/problemCard.js';
import Scroll from "../scroll/scroll";
import "./problems.css"
import Question from "../question/question"
import Editor from "../editor/editor"
import SearchBox from "../searchBox/searchBox"
import CommentBox from "../commentBox/commentBox"


class Problems extends Component{
	constructor(props){
		super(props);
		this.state={
			problems:"",
			route:"problemSet",
			problem:{},
			userSolved:this.props.userSolved,
		}
	}
	onSubmit=(object)=>{
			console.log(object)
		    fetch("http://localhost:3001/checkProblem",{
		      method: 'post',
		      headers :{'Content-Type':'application/json'},
		      async:false,
		      body :JSON.stringify({
		        data:object.text,
		        lang:object.lang,
		        p_id:this.state.problem.p_id,
		        c_id:this.state.problem.c_id,
		        u_id:this.props.id
		        // questionId:this.props.Problem.id,
		        // contestId:this.props.contest.id;

		      })
		    }).then(res => res.json())
		    .then(data=> console.log(data))
		    .catch(err => console.log(err));



	}
  componentDidMount=()=>{
  	    fetch(`http://localhost:3001/getAProblems`)
	    .then(res => res.json())
	    .then((data)=>{
	      this.setState({problems:data.prob});
	    })
	    .catch(err => alert("try again")); 

	    
		    fetch(`http://localhost:3001/getRight?u_id=${this.props.id}`)
		    .then(res=>res.json())
		    .then((data)=>{
		      let kk=new Set();
		      for(let i=0;i<data.length;i++){
		          kk.add(data[i].p_id);
		      }
		      this.setState({userSolved:kk})
		    })
		    .catch(err=>{alert("please reload")})


  }
	onSearch=(event)=>{
	  var tt=document.getElementById("search").value;
	  fetch(`http://localhost:3001/getSearch?tags=${tt}`)
	  .then(res=> res.json())
	  .then((data)=>{
	  	this.setState({problems:data.prob});
	  })
	  .catch(err => alert("try again"));

	  	  
	}
	openProblem=(id)=>{

	    fetch(`http://localhost:3001/getProblem?id=${id}`)
	    .then(res => res.json())
	    .then((data)=>{
	      console.log(data);
	      this.setState({problem:data.prob[0]});
	      this.setState({route:"problems"});
	      console.log(data);
	    })
	    .catch(err => alert("try again")); 
    	
	}
	render(){
		console.log(this.state.userSolved)
		if(this.state.route==="problemSet"){
			const comp=[]
			for(let i=0;i<this.state.problems.length;i++){
				if(this.state.userSolved.has(this.state.problems[i].p_id))
					comp.push(<Card key={this.state.problems[i].p_id} id={this.state.problems[i].p_id} name={this.state.problems[i].p_name} isAccepted={1} difficulty={this.state.problems[i].difficulty} problem={this.openProblem} tags={this.state.problems[i].tags} />)
				else
					comp.push(<Card key={this.state.problems[i].p_id} id={this.state.problems[i].p_id} name={this.state.problems[i].p_name} isAccepted={0} difficulty={this.state.problems[i].difficulty} problem={this.openProblem} tags={this.state.problems[i].tags} />)

			}
			return(
				<div >
					<legend className="f1 fw6 ph0 mh0 center">PROBLEM SET</legend>
					<SearchBox onSearchChange={this.onSearch} />
					<Scroll style={{width:"90%"}}>
					<table  style={{width:"100%"}}>
						<tbody>
							<tr className="new " >
								<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"75%"}}>PROBLEM</td>
								<td className="ba bw1 " style={{width:"10%",whiteSpace:"pre-line"}}>DIFFICULTY</td>
								<td className="ba bw1" style={{width:"5%"}} >AC</td>
							</tr>
								{comp}
						</tbody>
					</table>
					</Scroll>
				</div>

			);
		}
		else{
			return(
	          <div>
	            <Question name={this.state.problem.p_name} question={this.state.problem.question} input={this.state.problem.input_form} output={this.state.problem.output_form} input1={this.state.problem.sample_ip} output1={this.state.problem.sample_op} />
	            <Editor onSubmit={this.onSubmit} />
	            <div className="center" style={{width:"80%"}}>
	            <CommentBox  url=""
	          	pollInterval={20000} p_id={this.state.problem.p_id} handle={this.props.handle} />
	            </div>
	          </div>
	        );
		}
	}



}
export default Problems;