import React, { Component } from 'react'
import "./wrongCard.css"

const WrongCard=(props)=>{
	const {id,name,problem}=props;
	return(

		<tr className="new">
			<td className="ba bw1 center" style={{width:"10%"}}>{id}</td>
			<td  className="ba bw1 pointer" style={{width:"90%"}} onClick={()=>problem(id)}>
				{name}</td>
		</tr>

	);

}
export default WrongCard;