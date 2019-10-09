import React, { Component } from 'react'
import "./ongoingCCard.css"

const ongoingCCard=(props)=>{
	const {id,name,start,duration,problem}=props;
	return(

		<tr className="new" >
			<td  className="ba bw1 f6 pointer" style={{width:"40%",fontSize:"0.7em"}} onClick={()=>problem(id)}>
				<div>
					{name}
				</div>
			</td>
			<td  className="ba f6 bw1 pointer" style={{width:"35%",fontSize:"0.7em"}}>
				{start}</td>
			<td  className="ba bw1 f6 pointer" style={{width:"25%",fontSize:"0.7em"}}>
				{duration}</td>


		</tr>

	);

}
export default ongoingCCard;