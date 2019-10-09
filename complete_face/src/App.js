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

    
    this.updateWindowDimensions=this.updateWindowDimensions.bind(this);}

  
    componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize',this.updateWindowDimensions);
    }
    componentWillUnmount(){
      window.removeEventListener('resize',this.updateWindowDimensions);
    }
    updateWindowDimensions(){
      this.setState({width:window.innerWidth,height:window.innerHeight})
    }
onSubmit=(text)=>{

    fetch("http://localhost:3001/kur",{
      method: 'post',
      headers :{'Content-Type':'application/json'},
      body :JSON.stringify({
        data:text,
      })
    }).then(res => res.json())
    .then(data=> console.log(data))
}

important_fetch=()=>{
    fetch(`http://localhost:3001/getWrong?u_id=${this.props.user.u_id}`)
    .then(res => res.json())
    .then((data)=>{
      this.props.loadWrong(data.prob);
    })
    .catch(err => {alert("try again")});  

    fetch("http://localhost:3001/getContest")
    .then(res=>res.json())
    .then((data)=>{
      this.props.onContestChange(data.con);
    })
    .catch(err=>{this.props.onContestChange([]);
    })

    fetch(`http://localhost:3001/getRight?u_id=${this.props.user.u_id}`)
    .then(res=>res.json())
    .then((data)=>{
      let kk=new Set();
      for(let i=0;i<data.length;i++){
          kk.add(data[i].p_id);
      }
      this.props.loadRight(kk);
    })
    .catch(err=>{alert("please reload")})

    fetch(`http://localhost:3001/getChart?u_id=${this.props.user.u_id}`)
    .then(res=>res.json())
    .then((data)=>{
    let dd=[{x:0,y:0}]
      for(var i in data){
          dd.push({x:parseInt(parseInt(i)/(1000*60*60*24)),y:data[i]})
      }
          const datas = [
            {                 
                color: "blue", 
                points: dd
            }
        ];
      this.setState({data:datas});

    })
    .catch(err=>{alert("please reload")})





}
onSignin=()=>{

  this.important_fetch();

}


  problemSet=()=>{
    //call the data base
    console.log(this.props.route);
    var tt=this.props.keys;
    console.log(this.props.keys);
    const prob=[{id:1,name:"cows problem",difficulty:2100},{id:2,name:"rat race",difficulty:2100},{id:4,name:"road runner",difficulty:2100}];
    if(this.props.route === "problemSet"){
      if(this.props.keyP === "1" ) {
        this.props.loadKeyP("2")
      }
      else{
        this.props.loadKeyP("1");
      }
      
    }
    this.props.onRoutesChange("problemSet");

  }

openProblem=(id)=>{


    fetch(`http://localhost:3001/getProblem?id=${id}`)
    .then(res => res.json())
    .then((data)=>{
      // console.log("fg");
      this.props.onProblemChange(data.problem);
      this.props.onRoutesChange("question");
      console.log(data);
    })
    .catch(err => alert("try again")); 




}

openContest=(id)=>{


      if(this.props.keyC === "1" ) {
        this.props.loadKeyC("2")
      }
      else{
        this.props.loadKeyC("1");
      }
      

    this.props.onContestIdChange(id);
    this.props.onRoutesChange("contest");

  


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

// onSubmitContest=(text)=>{
//     fetch("http://localhost:3001/contest",{
//       method: 'post',
//       headers :{'Content-Type':'application/json'},
//       body :JSON.stringify({
//         data:text,
//         questionId:this.props.Problem.id,
//         contestId:this.props.contest.id;

//       })
//     }).then(res => res.json())
//     .then(data=> console.log(data))
// }
  render() {

    let kk=this.state.width;
    return (
      <div className="App">
        {this.props.route === 'signin'?
            <Signin OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} onSignin={this.onSignin} />
        :this.props.route === 'home'? 
          <div>
          <Navigation OnrouteChange={this.OnrouteChange} clearState={this.onClear} issignedin={this.props.issignedin} problemSet={this.problemSet} important_fetch={this.important_fetch} />
          <div style={{display:"flex",position:"relative"}}>
            <div style={{width:"78%"}}>
              <Profile name={this.props.user.u_name} handle={this.props.user.handle} rating={this.props.user.rating} email={this.props.user.email} institution={this.props.user.institution} styles={"red"}/>
            </div>
            <div className="pv6" style={{width:"22%"}}>
              <div className="pv3">
                  <WrongProblem problems={this.props.wrong_arr} openProblem={this.openProblem} userSolved={this.props.userSolved} />
              </div>
              <OngoingC contests={this.props.contests} problem={this.openProblem}/>
            </div>
          </div>

              <div id="Line pieo2" className="line" style={{width:0.55*kk,backgroundColor:"white",marginLeft:"15%"}}>
                    <LineChart id="kkk" 
                        width={0.55*kk}
                        height={300}
                        xLabel="Time"
                        yLabel="Score"
                        interpolate="linear"
                        showLegends="true"
                        legendPosition="top-right"
                        // options={{
                        //   responsive: true,
                        //   maintainAspectRatio: true,
                        // }}
                        data={this.state.data}
                    />
              </div>
          </div>
        :this.props.route === 'ContestSet'?
          <div>
          <Navigation OnrouteChange={this.OnrouteChange} clearState={this.onClear} issignedin={this.props.issignedin} problemSet={this.problemSet} important_fetch={this.important_fetch} />
          <ContestSet openContest={this.openContest} u_id={this.props.user.u_id} />
          </div>
        :this.props.route === 'contest'?
          <div>
            <Navigation OnrouteChange={this.OnrouteChange} clearState={this.onClear} issignedin={this.props.issignedin} problemSet={this.problemSet} important_fetch={this.important_fetch} />
            <Contest key={this.props.keyC} contestId={this.props.contestId} userSolved={this.props.userSolved} u_id={this.props.user.u_id} routeChanger={this.props.onRoutesChange} 
            openContest={this.openContest} />
          </div>
        :this.props.route === 'problemSet'?
          <div>
          <Navigation OnrouteChange={this.OnrouteChange} clearState={this.onClear} issignedin={this.props.issignedin} problemSet={this.problemSet} important_fetch={this.important_fetch} />
          <Problems key={this.props.keyP} userSolved={this.props.userSolved} id={this.props.user.u_id} handle={this.props.user.handle}/>
          </div>
        :this.props.route === 'question'?
          <div>
            <Navigation OnrouteChange={this.OnrouteChange} clearState={this.onClear} issignedin={this.props.issignedin} problemSet={this.problemSet} important_fetch={this.important_fetch} />
            <Question name={this.props.question.p_name} question={this.props.question.question} input={this.props.question.input_form} output={this.props.question.output_form} input1={this.props.question.sample_ip} output1={this.props.question.sample_op} />
            <Editor onSubmit={this.onSubmit} />
            <div className="center" style={{width:"80%"}}>
            <CommentBox  url=""
          pollInterval={20000} p_id={21} handle={this.props.user.handle} />
            </div>
          </div>
        :<Register OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
