import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { ConnectedRouter, routerMiddleware} from 'react-router-redux'
import { Route,Redirect} from 'react-router-dom'
import thunk from 'redux-thunk'
import allReducers from './reducers'
import Header from './components/layouts/Header'
import ListUsers from './components/layouts/ListUsers'
import Chat from './components/layouts/Chat'
import './index.css';


const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  allReducers
  ,
  applyMiddleware(thunk,middleware)
)

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
      <div className="App">
        <Redirect from="/" to="/home"/>
	      <Route path="/" component={Header}/>   
        <Route path="/home" component={ListUsers}/>
        <Route path="/chat/:userid" component={Chat} />
      </div>
 	  </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root')
);
