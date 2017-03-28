import { combineReducers } from 'redux'
import userReducer from './users'
import globalReducer from './global'
import { routerReducer } from 'react-router-redux'

const allReducers = combineReducers({
    users:userReducer,
    global:globalReducer,
    router:routerReducer
})
export default allReducers;
