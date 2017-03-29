import { combineReducers } from 'redux'
import userReducer from './users'
import globalReducer from './global'
import messagesReducer from './messages'
import { routerReducer } from 'react-router-redux'

const allReducers = combineReducers({
    users:userReducer,
    global:globalReducer,
    messages:messagesReducer,
    router:routerReducer
})
export default allReducers;
