import React, { Component } from 'react'
import "./contest_q.css"

const Contest_q=(props)=>{
	const {id,name,isAccepted,problemC}=props;
	return(
		<tr className="new">
			<td className="ba bw1 center" style={{width:"10%"}}>{id}</td>
			<td  className="ba bw1 pointer" style={{width:"85%"}} onClick={()=>problemC(id)}>
			{name}
			</td>
			{isAccepted===1?
				<td className="ba bw1" style={{width:"5%",backgroundColor:"#d4edc9"}} ></td>:
				<td className="ba bw1" style={{width:"5%",backgroundColor:"white"}} ></td>
			}
		</tr>

	);

}
export default Contest_q;