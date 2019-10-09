import React from 'react';
import "./searcBox.css"
const SearchBox=({onSearchChange})=>{
	return(
		<div className="ma4">
			<center><input id="search" type="search" placeholder="Search by tag" 
			  className="pa3" /></center>
			  <br />
			<center><button onClick={onSearchChange} className="center w-45 grow link pa2 pd2 dib pro zone">SEARCH</button></center>
		</div>
		);
}
export default SearchBox;

