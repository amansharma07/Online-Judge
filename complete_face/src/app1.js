import React, { Component } from 'react';
import './App.css';
import {connect}  from 'react-redux'; 
import {onInputChange,onImgUrlChange,onBoxChange,onRouteChange,onUserChange,isSignedChange,clearHome,problemChange,searchChange,contestChange,LoadKeyP,LoadKeyC,LoadWrong,LoadRight,OnContestIdChange} from "./action.js";
import Navigation from "./components/navigation/Navigation"
import Logo from "./components/logo/logo"
import Rank from "./components/rank/rank"
import ImageLinkForm from "./components/imgLink/imgLink"
import Particles from 'react-particles-js';
import FaceRec from "./components/faces/faces"
import Signin from "./components/signin/signin"
import Register from "./components/register/register"
import Profile from "./components/profile/profile"
import Question from "./components/question/question"
import Editor from "./components/editor/editor"
import Problems from "./components/problems/problems"
import WrongProblem from "./components/wrongProblem/wrongProblem"
import Contest from "./components/contest/contest"
import OngoingC from "./components/ongoingC/ongoingC"
import Timer from "./components/timer/timer"
import ContestSet from "./components/contestSet/contestSet"
import Leaderboard from "./components/leaderboard/leaderboard"
import LineChart from "react-linechart"
import "../node_modules/react-linechart/dist/styles.css"
import CommentBox from "./components/commentBox/commentBox"
// hackerearth 





const mapStateToProps = state =>{


  return {
    route:state.home.route,
    user:state.home.user,
    issignedin:state.home.issignedin,
    contestId:state.home.contestId,
    contests:state.home.contests,
    question:state.home.problem,
    keyP:state.home.keyP,
    keyC:state.home.keyC,
    wrong_arr:state.home.wrong_arr,
    wrong:state.home.wrong,
    userSolved:state.home.userSolved
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  loadUser: (data) => dispatch(onUserChange(data)),
  onRoutesChange: (data) => dispatch(onRouteChange(data)),
  isSignedsChange: data => dispatch(isSignedChange(data)),
  onClean: () => dispatch(clearHome()),
  onProblemChange:(data)=>dispatch(problemChange(data)),
  onContestChange:(val)=>dispatch(contestChange(val)),
  loadKeyP:(val)=>dispatch(LoadKeyP(val)),
  loadKeyC:(val)=>dispatch(LoadKeyC(val)),
  loadWrong:(val)=>dispatch(LoadWrong(val)),
  loadRight:(val)=>dispatch(LoadRight(val)),
  onContestIdChange:(val)=>dispatch(OnContestIdChange(val))
  }
}



 
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      width:0,
      height:0,
      data:[]}

    
    }

  
 

onClear = () => {
  this.props.onClean();
}

OnrouteChange = (route) => {
    this.props.onRoutesChange(route);
    if(route === "signin" || route==="register"){
        this.props.isSignedsChange(false);
    }
    else
        this.props.isSignedsChange(true);
}
  render() {

    let kk=this.state.width;
    return (
      <div className="App">
          <Register OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
