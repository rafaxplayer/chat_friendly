import { LOGIN_USER,LIST_USERS } from '../actionTypes'

export default (state = { userauth:null, list:[] }, action)=>{
    switch(action.type){
        case LOGIN_USER:
            return Object.assign({},state,{ userauth:action.payload })
        case LIST_USERS:
            return Object.assign({},state,{ list:action.payload })
        default:
            return state;

    }
}