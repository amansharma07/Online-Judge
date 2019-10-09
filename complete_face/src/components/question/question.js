import React, { Component } from 'react'
import './question.css';
const Question=({name,question,input,output,input1,output1})=>{
	// let out="kela kah\nthela"
	let out=(output1.toString())
	let crr="";
	for(let i=0;i<out.length;i++)
		crr+=out[i];
	// console.log(out);
	// var outs=(''+output1).slice(1);
	return(
		<div className="ma3 bb fonty">
			<legend className="f1 fw6 ph0 mh0 center">{name}</legend>
			<div style={{width:"90%"}} className="whole">
				<div style={{whiteSpace:"pre-line"}} className="pv3 bb">
					<legend className="f3 fw6 ph0 mh0 ">QUESTION</legend>
					{question}
				</div>
				<div style={{whiteSpace:"pre-line"}} className="pv3 bb">
					<legend className="f3 fw6 ph0 mh0 " >INPUT</legend>
					{input}
				</div>
				<div style={{whiteSpace:"pre-line"}} className="pv3 bb">
					<legend className="f3 fw6 ph0 mh0 ">OUTPUT</legend>
					{output}
				</div>
				<div className="pv2 bb" style={{whiteSpace:"pre-line"}} >
					<legend className="f3 fw6 ph0 mh0 ">EXAMPLES</legend>
				</div>
				<div className="example" styles={{padding:"0"}}>
				<div style={{whiteSpace:"pre-line"}} className="pv2">
					<legend className="f6 fw6 ph0 mh0 ">Sample Input: 1</legend>
					{input1}
				</div>
				<div  className="pv2">
					<legend className="f6 fw6 ph0 mh0 " >Sample Output: 1</legend>
					<pre>{crr}</pre>
				</div>
				</div>
			</div>		
		</div>
	)
}
export default Question;

