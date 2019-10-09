import React from  'react';
import {onRPasswordChange,onREmailChange,onRMarkChange,clearRegister,onRNameChange,onRHandleChange,onRInstituteChange} from "../../action";
import {connect}  from 'react-redux'; 
import GoogleLogin from 'react-google-login';
import "./register.css"

const mapStateToProps = state =>{
	return {
		password:state.register.password,
		email:state.register.email,
		mark:state.register.mark,
		name:state.register.name,
		institute:state.register.institute,
		handle:state.register.handle
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	onPasswordsChange: (event) => dispatch(onRPasswordChange(event.target.value)),
	onEmailsChange: (event) => dispatch(onREmailChange(event.target.value)),
	onMarksChange: (val) => dispatch(onRMarkChange(val)),
	onNamesChange: (event) => dispatch(onRNameChange(event.target.value)),
	onHandlesChange: (event)=>dispatch(onRHandleChange(event.target.value)),
	onInstitutesChange: (event)=>dispatch(onRInstituteChange(event.target.value)),
	onClear:() => dispatch(clearRegister())
	}
}



class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			info:{},
			route:"register"
		}
	}
	onGoogleSubmit=()=>{
	  fetch("http://localhost:3001/signingoogle",{
				method: 'post',
				headers :{'Content-Type':'application/json'},
				body :JSON.stringify({
					email:this.state.info.email,
					googleId:this.state.info.googleId,
					name:this.state.info.name,
					handle:this.props.handle,
					institute:this.props.institute
				})
			}).then(res => res.json())
			.then(user => {
				console.log(user)
				if(user.u_id){
					this.props.loadUser(user);
					this.props.OnrouteChange("home");
					
					}
				else{
					console.log("error occured")
				}
			}).catch(err=> console.log(err))
	}

	responseGoogleSucc = (response) => {
	  console.log(response.profileObj);
	  const {googleId,email,name,imageUrl}=response.profileObj;
	  this.setState({info:{googleId:googleId,
			email:email,
			name:name,
			imageUrl:imageUrl}})
	  this.setState({route:"mini"})
	}

	responseGoogleFail = (response) => {
	  console.log(response.profileObj);
	}

	onSubmit =()=>{
		const {email,password,name,onClear,onMarksChange,institute,handle}=this.props;

		var pass= new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.{8,})")
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				if(pass.test(password)){
					fetch("http://localhost:3001/register",{
						method: 'post',
						headers :{'Content-Type':'application/json'},
						body :JSON.stringify({
							email:email,
							name:name,
							password:password,
							handle:handle,
							institute:institute
						})
					}).then(res => res.json())
					.then(user => {
						if(user.u_id){
							onClear();
							this.props.loadUser(user);
							this.props.OnrouteChange('home');
						}
						else{
							onMarksChange(1);
						}
					})
					.catch(err => alert("can't connect to server"));
				}
				else{
					alert("the password should be atleast 8 characters long with one capital letter one small letter and one number");
				}
			}
		else{
			alert("improper email");
		}
		
	}
	render(){
	const {onNamesChange,onEmailsChange,onPasswordsChange,onHandlesChange,onInstitutesChange,mark}=this.props;
	if(this.state.route==='register'){
	return(

		<article style={{marginTop:"200px"}} className="br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name" >Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
			        onChange={onNamesChange} required/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
			        onChange={onEmailsChange} required/>
			      </div>
			      {mark===1 && 
			
			      		<div style={{height:20,marginTop:0}} className='center'>
			      			<h5 style={{color:"red",marginTop:0}}>{"choose different username"}</h5>
			      		</div>}
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password" required>Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
			        onChange={onPasswordsChange} required/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="HANDLE" >{"Handle"}</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
			        onChange={onHandlesChange} required/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="INSTITUTE" >{"Institute"}</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
			        onChange={onInstitutesChange} required/>
			      </div>
			    </fieldset>
			    <div className="pv1">
			      <input 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
			      type="submit" 
			      value="Register" 
			      onClick={this.onSubmit}
			      />
			    <div className="lh-copy mt3 center">
			      <p  onClick={()=>this.props.OnrouteChange("signin")} className="f6 link dim black db pointer">Sign In</p>
			    </div>
				<div className="">
				  <GoogleLogin
				    clientId="605819162339-jn8m2skktvou0dhnt7jss9gtic3lpadv.apps.googleusercontent.com"
				    theme="dark"
				    buttonText="Register with Google"
				    icon="true"
				    onSuccess={this.responseGoogleSucc}
				    onFailure={this.responseGoogleFail}
				    cookiePolicy={'single_host_origin'}
				  />
				  </div>
			    </div>
			  </div>
			</main>
		</article>
		);
		}
		else{
		return(
		<article style={{marginTop:"200px"}} className="br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="HANDLE" >{"HANDLE"}</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
			        onChange={onHandlesChange} required/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="INSTITUTE" >{"INSTITUTE"}</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
			        onChange={onInstitutesChange} required/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
			      type="submit" 
			      value="Register" 
			      onClick={this.onGoogleSubmit}
			      />
			    </div>
			  </div>
			</main>
		</article>
		);}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);