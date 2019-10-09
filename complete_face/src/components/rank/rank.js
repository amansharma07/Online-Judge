import React from  'react';

const Rank =({user})=>{
	return(
		<div>
		<div className="f3 white">
			<center>{`${user.name},UR CURRENT RANK IS `}</center>
		</div>
		<div className="f1 white">
			<center>{`#${user.entries}`}</center>
		</div>
		</div>
		);
}
export default Rank;