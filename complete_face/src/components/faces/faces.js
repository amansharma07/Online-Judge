import React from  'react';
import "./facereg.css"

const FaceRec =({image_url,box})=>{
	return(
		<div className="pa3 center">
			<div style={{width:"40%",height:"auto"}} className="absolute mt2">
			<img id="inputimage" src={image_url} alt="" height="auto" width="100%" />
			<div className="bounding" style={{top :box.topRow,right:box.rightCol,bottom: box.bottomRow,left:box.leftCol}}></div>
		
			</div>
		</div>
		);
}
export default FaceRec;