import { GET_MESSAGES,CLEAR_MESSAGES} from '../actionTypes'

const initialState={
    list:[]
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_MESSAGES:
            return Object.assign({},state,{list:action.payload})
        case CLEAR_MESSAGES:
            return Object.assign({},state,initialState)
        default:
            return state;

    }
}