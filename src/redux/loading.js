import * as ActionTypes from './ActionTypes';

export const Loading = (state = {
    loader: false
}, action) => {
    switch(action.type) {
        case ActionTypes.LOADING: 
            if(action.payload) {
                return {
                    ...state,
                    loader: true
                }
            }
            else if (!action.payload) {
                return {
                    ...state,
                    loader: false
                }
            }
            
        default:
            return state;
    }      
}