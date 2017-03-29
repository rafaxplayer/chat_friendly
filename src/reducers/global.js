import { IS_CHAT} from '../actionTypes'

const initialState={
    ischat:false
};

export default function(state = initialState, action){
    switch(action.type){
        case IS_CHAT:
            return Object.assign({},state,{ischat:action.payload})
        
        default:
            return state;

    }
}