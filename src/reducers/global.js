import { IS_CHAT } from '../actionTypes'

export default (state = { ischat:false }, action) => {
    switch(action.type){
        case IS_CHAT:
            return Object.assign({},state,{ischat:action.payload})
         default:
            return state;

    }
}