import React,{Component} from 'react';
import ContestCard from '../contestCard/contestCard.js';
import Scroll from "../scroll/scroll";
import "./contestSet.css"


class ContestSet extends Component{
	constructor(props){
		super(props);
		this.state={
			contests:[],
			present:"",
		}
	}

  componentDidMount=()=>{
  	    fetch(`http://localhost:3001/getAllContests`)
	    .then(res => res.json())
	    .then((data)=>{
	      this.setState({contests:data.con});
	    })
	    .catch(err => alert("try again")); 



  }
  register=(id)=>{
  	  	 fetch(`http://localhost:3001/registerContest?c_id=${id}&u_id=${this.props.u_id}`)
	    .then(res => res.json())
	    .then((data)=>{
	      alert("registration successful")
	    })
	    .catch(err => alert("try again")); 
  }
	render(){
		const {contests}=this.state;
			var a=new Date();
			var bb=a.toISOString()
			var time=`${bb.substring(0,4)}/${bb.substring(5,7)}/${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
			var present=Date.parse(time)
			const con1=[]
			const con2=[]
			const con3=[]
			for(let i=0;i<contests.length;i++){
				let start=Date.parse(`${contests[i].date_start.substring(0,10)} ${contests[i].start_at}`);
				let end=Date.parse(`${contests[i].date_con.substring(0,10)} ${contests[i].end_at}`);
				if(present>end)
					con1.push(<ContestCard key={this.state.contests[i].c_id} id={this.state.contests[i].c_id} name={this.state.contests[i].c_name} start={this.state.
					contests[i].start_at} end={contests[i].end_at} date={contests[i].date_con} problem={this.props.openContest} />)
				else if(present<=end && present>=start){
					con2.push(<ContestCard key={this.state.contests[i].c_id} id={this.state.contests[i].c_id} name={this.state.contests[i].c_name} start={this.state.
					contests[i].start_at} end={contests[i].end_at} date={contests[i].date_con} problem={this.props.openContest} />)					
				}
				else{
					con3.push(<ContestCard key={this.state.contests[i].c_id} id={this.state.contests[i].c_id} name={this.state.contests[i].c_name} start={this.state.
					contests[i].start_at} end={contests[i].end_at} date={contests[i].date_con} problem={this.register} />)
				}
			}
			return(
				<div >{con1.length!=0 && <div className="pv3" >
					<legend className=" fw6 ph0 mh0 center">PAST CONTESTS</legend>
					<div style={{overflowY:"scroll",maxHeight:"200px"}} >
					<table  style={{width:"100%"}}>
						<tbody>
							<tr  className="new">
								<td  className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"50%"}}>NAME</td>
								<td className="ba bw1 " style={{width:"20%",whiteSpace:"pre-line"}}>DATE</td>
								<td className="ba bw1" style={{width:"10%"}} >START</td>
								<td className="ba bw1" style={{width:"10%"}} >END</td>
							</tr>
								{con1}
						</tbody>
					</table>
					</div>
					</div>}
					{con2.length!=0 && <div style={{overflowY:"scroll",maxHeight:"200px"}} className="pv3">
					<legend className=" fw6 ph0 mh0 center">PRESENT CONTESTS</legend>
					<table  style={{width:"100%"}}>
						<tbody>
							<tr className="new " >
								<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"50%"}}>NAME</td>
								<td className="ba bw1 " style={{width:"20%",whiteSpace:"pre-line"}}>DATE</td>
								<td className="ba bw1" style={{width:"10%"}} >START</td>
								<td className="ba bw1" style={{width:"10%"}} >END</td>
							</tr>
								{con2}
						</tbody>
					</table>
					</div>}
					{con3.length!=0 && <div style={{overflowY:"scroll",maxHeight:"200px"}} className="pv3"> 
					<legend className=" fw6 ph0 mh0 center">FUTURE CONTESTS</legend>
					<table  style={{width:"100%"}}>
						<tbody>
							<tr className="new " >
								<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"50%"}}>NAME</td>
								<td className="ba bw1 " style={{width:"20%",whiteSpace:"pre-line"}}>DATE</td>
								<td className="ba bw1" style={{width:"10%"}} >START</td>
								<td className="ba bw1" style={{width:"10%"}} >END</td>
							</tr>
								{con3}
						</tbody>
					</table>
					</div>}
				</div>

			);

	}



}
export default ContestSet;