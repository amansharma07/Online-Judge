import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/mode/javascript'
// import 'brace/mode/python'
import 'brace/theme/monokai'
import "./editor.css"
import "../profile/profile.css"


class Editor extends Component{
	constructor(props){
		super(props);
		this.state={lang:"java"};
	}
	changeEditor=(ids)=>{
		this.setState({lang:ids});
	}
	onSubmits=()=>{

	    const editor = this.ace.editor; // The editor object is from Ace's API
	    this.props.onSubmit({text:editor.getValue(),lang:this.state.lang});
	}
	render(){
		var editor;
		var code;
		return(
		<div>
			<div className="ma2 center">
				<table className="ba bw1 b--white">
					<tbody>
						<tr>
	                        <td className="space"><input type="radio" name="site_name" 
	                                   value={"c"} 
	                                   onChange={()=>this.changeEditor("c")} />{"c"}
	                        </td>
                        	<td className="space"><input type="radio" name="site_name" 
                                   value={"javascript"} 
                                   onChange={()=>this.changeEditor("javascript")} />{"javascript"}
                            </td>
                        	<td className="space"><input type="radio" name="site_name" 
                                   value={"java"} 
                                   onChange={()=>this.changeEditor("java")} />{"java"}
                            </td>
                        	<td className="space"><input type="radio" name="site_name" 
                                   value={"python"} 
                                   onChange={()=>this.changeEditor("python")} />{"python"}
                            </td>

						</tr>
					</tbody>
				</table>
			</div>
			<div className="center pv1">
				<AceEditor mode={this.state.lang==='c'?"java":this.state.lang} width="500px" height="500px" theme="monokai"  ref={instance => { this.ace = instance; }}/>
			</div>
			<div className="center pv2">
				<button  onClick={this.onSubmits} className="center w-45 grow link pa2 pd2 dib pro zone">submit</button>
			</div>

			
		</div>);
	}
}
export default Editor;