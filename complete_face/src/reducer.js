import {CHANGE_PASSWORD,CHANGE_EMAIL,CHANGE_MARK,CHANGE_RNAME,CHANGE_RPASSWORD,CHANGE_REMAIL,CHANGE_RMARK,clearStates,registerClear,CHANGE_INPUT,CHANGE_IMG_URL,CHANGE_BOX
,CHANGE_ROUTE,CHANGE_USER,CHANGE_ISSIGNEDIN,CLEAR_HOME,ON_CLICK_CHANGE,CHANGE_PROBLEM,CHANGE_SEARCH,CHANGE_CONTEST,LOAD_KEYP,LOAD_KEYC,LOAD_WRONG,LOAD_RIGHT,CONTEST_ID_CHANGE
,CHANGE_RINSTITUTE,CHANGE_RHANDLE} from "./constants"

const initialSignupState ={
	email:"",
	password:"",
	mark:0
}
export const signup = (state=initialSignupState,action={}) => {
	switch(action.type){
		case CHANGE_PASSWORD:
			return Object.assign({},state,{password:action.payload});
		case CHANGE_EMAIL:
			return Object.assign({},state,{email:action.payload});
		case CHANGE_MARK:
			return Object.assign({},state,{mark:1});
		case clearStates:
			return Object.assign({},initialSignupState);
		default:
			return state;
	}
}

const initialRegisterState = {
	email:"",
	password:"",
	mark:0,
	name:"",
	handle:"",
	institute:""

}
export const register = (state=initialRegisterState,action={}) => {
	switch(action.type){
		case CHANGE_RPASSWORD:
			return Object.assign({},state,{password:action.payload});
		case CHANGE_REMAIL:
			return Object.assign({},state,{email:action.payload});
		case CHANGE_RMARK:
			return Object.assign({},state,{mark:action.payload});
		case CHANGE_RNAME:
			return Object.assign({},state,{name:action.payload});
		case CHANGE_RHANDLE:
			return Object.assign({},state,{handle:action.payload});
		case CHANGE_RINSTITUTE:
			return Object.assign({},state,{institute:action.payload});
		case registerClear:
			return Object.assign({},initialRegisterState);
		default:
			return state;
	}
}

const initialHomeState = {
	  problem:{},
      route:'signin',
      contestId:"",
      contests:[],
      keyP:"1",
      keyC:"1",
      user : {
        u_id:"",
        u_name:"",
        email:"",
        handle:"",
        rating:0,
        institute:""
      },
      userSolved:new Set([1]),
      wrong:new Set(),
      wrong_arr:[],
      issignedin:true,
    }

export const home = (state=initialHomeState,action={}) => {
	switch(action.type){
		case CHANGE_PROBLEM:
			return Object.assign({},state,{problem:action.payload})
		case CHANGE_ROUTE:
			return Object.assign({},state,{route:action.payload});
		case CHANGE_USER:
			return Object.assign({},state,{user:action.payload});
		case CHANGE_ISSIGNEDIN:
			return Object.assign({},state,{issignedin:action.payload});
		case CLEAR_HOME:
			return Object.assign({},initialHomeState);
		case CHANGE_CONTEST:
			return Object.assign({},state,{contests:action.payload});
		case LOAD_KEYP:
			return Object.assign({},state,{keyP:action.payload});
		case LOAD_KEYC:
			return Object.assign({},state,{keyC:action.payload});
		case LOAD_WRONG:
			return Object.assign({},state,{wrong_arr:action.payload});
		case LOAD_RIGHT:
			return Object.assign({},state,{userSolved:action.payload});
		case CONTEST_ID_CHANGE:
			return Object.assign({},state,{contestId:action.payload});
		default:
			return state;
	}
}


