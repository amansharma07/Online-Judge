import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "tachyons";
import {signup,register,home} from './reducer.js';
import * as myProvider from "react-redux";
import {createStore,applyMiddleware,combineReducers} from "redux";
import {createLogger} from "redux-logger";

// import  thunkMiddleware  from "redux-thunk";
const rootReducer=combineReducers({register,signup,home});
const logger=createLogger();//remove later
const store=createStore(rootReducer,applyMiddleware(logger));

ReactDOM.render(<myProvider.Provider store={store} >
						<App />
				</myProvider.Provider >, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


