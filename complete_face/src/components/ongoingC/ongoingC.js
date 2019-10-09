import React from 'react';
import OngoingCCard from '../ongoingCCard/ongoingCCard.js';
import Scroll from "../scroll/scroll";
import "./ongoingC.css"
const OngoingC=({contests,problem})=>{
	const comp=[]
	console.log(contests);
	for(let i=0;i<contests.length;i++){
		let k1=(Date.parse(contests[i].date_con)-Date.parse(contests[i].date_start))
		let hours=k1/(1000*60*60)
		let min=(k1%(1000*60*60))/(1000*60);
		console.log(hours)
		comp.push(<OngoingCCard key={contests[i].c_id} name={contests[i].c_name} start={`${contests[i].date_start.substring(0,10)} ${contests[i].start_at}`} problem={problem} duration={`${hours}h:${min}min`} />)
	}
	return(
		<div >
			<legend className="f4 fw6 ph0 mh0 center">ONGOING CONTEST</legend>
			<table  style={{width:"100%"}}>
				<tbody>
					<tr className="new ">
						<td  className="ba bw1 pointer" style={{width:"40%",fontSize:"0.7em"}}>NAME</td>
						<td  className="ba bw1 pointer" style={{width:"35%",fontSize:"0.7em"}}>START</td>
						<td  className="ba bw1 pointer" style={{width:"25%",fontSize:"0.7em"}}>DURATION</td>
					</tr>
				</tbody>
				<tbody style={{overflowY:"scroll",maxHeight:"100px"}} >
					{comp}
				</tbody>
			</table>
		</div>

	);
}
export default OngoingC;