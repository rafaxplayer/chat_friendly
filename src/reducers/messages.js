import { GET_MESSAGES,CLEAR_MESSAGES } from '../actionTypes'

export default (state = { list:[] }, action)=>{
    switch(action.type){
        case GET_MESSAGES:
            return Object.assign({},state,{ list:action.payload })
        case CLEAR_MESSAGES:
            return Object.assign({},state,{ list:[] })
        default:
            return state;

    }
}