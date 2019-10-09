import React from  'react';
import "./logo.css"
import Tilt from 'react-tilt'
import brain from "./brain.png"

const Logo =()=>{
	return(
		<div >
			<Tilt className="Tilt br2 shadow-2 " options={{ max : 75 }} style={{ height: 130, width: 130 }} >
 				<div className="Tilt-inner b3"> <img style={{paddingTop:"10px"}} src ={brain} alt="brain" /></div>
			</Tilt>
		</div>
		);
}
export default Logo;