import React from  'react';
import {onPasswordChange,onEmailChange,onMarkChange,clearState} from "../../action";
import {connect}  from 'react-redux'; 
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom';


const mapStateToProps = state =>{
	return {
		password:state.signup.password,
		email:state.signup.email,
		mark:state.signup.mark
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	onPasswordsChange: (event) => dispatch(onPasswordChange(event.target.value)),
	onEmailsChange: (event) => dispatch(onEmailChange(event.target.value)),
	onMarksChange: (val) => dispatch(onMarkChange(val)),
	onClear:() => dispatch(clearState())
	}
}



class Signin extends React.Component{
	responseGoogleSucc = (response) => {
	  console.log(response.profileObj);
	  const {googleId,email,name,imageUrl}=response.profileObj;
	  fetch("http://localhost:3001/signingoogle",{
				method: 'post',
				headers :{'Content-Type':'application/json'},
				body :JSON.stringify({
					email:email,
					googleId:googleId,
					name:name,
					imageUrl:imageUrl
				})
			}).then(res => res.json())
			.then(user => {
				console.log(user)
				if(user.u_id){
					this.props.loadUser(user);
					this.props.OnrouteChange('home');
					}
				else{
				}
			}).catch(err=> console.log(err))
	}

	responseGoogleFail = (response) => {
	  console.log(response.profileObj);
	}

	onSubmit=()=>{
			const {password,email}=this.props;

		fetch("http://localhost:3001/signin",{
			method: 'post',
			headers :{'Content-Type':'application/json'},
			body :JSON.stringify({
				email:email,
				password:password
			})
		}).then(res => res.json())
		.then(user => {
			if(user.u_id){
				this.props.onClear();
				this.props.loadUser(user);
				this.props.onSignin();
				this.props.OnrouteChange('home');
				}
			else{
				this.props.onMarksChange(1);
			}
		})
		
	}
	render(){
		const {onPasswordsChange,onEmailsChange,mark}=this.props;
		console.log("kela");
	return(

		<article  style={{marginTop:"200px"}} className=" ma80 br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center"  >
			<main className="pa4 black-80"  >
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" >Email</label>
			        <input  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
			        onChange={onEmailsChange}
			        required />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" >Password</label>
			        <input  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
			        onChange={onPasswordsChange} required />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={this.onSubmit}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" 
			      />
			    </div>
			    <div className="lh-copy mt3 center">
			      <p  onClick={()=>this.props.OnrouteChange("register")} className="f6 link dim black db pointer">Register Here</p>
			    </div>
			     {this.props.mark===1 && 
			
			      		<div style={{marginTop:0}} className='center'>
			      			<h5 style={{color:"red",marginTop:0}}>{"wrong username or password"}</h5>
			      		</div>}
			  </div>
			<div className="">
			  <GoogleLogin
			    clientId="605819162339-jn8m2skktvou0dhnt7jss9gtic3lpadv.apps.googleusercontent.com"
			    theme="dark"
			    icon="true"
			    onSuccess={this.responseGoogleSucc}
			    onFailure={this.responseGoogleFail}
			    cookiePolicy={'single_host_origin'}
			  />
			  </div>
			</main>
		</article>
		);
}}
export default connect(mapStateToProps,mapDispatchToProps)(Signin);