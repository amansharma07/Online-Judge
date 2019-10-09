import React, { Component } from 'react'
import "./problemCard.css"

const Card=(props)=>{
	const {id,name,isAccepted,problem,difficulty,tags}=props;
	return(

		<tr className="new">
			<td className="ba bw1 center" style={{width:"10%"}}>{id}</td>
			<td  className="ba bw1 pointer" style={{width:"75%"}} onClick={()=>problem(id)}>
				<div style={{float:"left"}}>{name}</div>
				<div style={{float:"right",fontSize: "0.8em",paddingTop: "6px", textAlign: "right"}}>{tags}</div>

			</td>
			<td className="ba bw1 center" style={{width:"10%"}}>{difficulty}</td>
			{isAccepted===1?
				<td className="ba bw1" style={{width:"5%",backgroundColor:"#d4edc9"}} ></td>:
				<td className="ba bw1" style={{width:"5%",backgroundColor:"white"}} ></td>

			}
		</tr>

	);

}
export default Card;