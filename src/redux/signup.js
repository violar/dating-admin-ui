import * as ActionTypes from './ActionTypes';

export const Signup = (state = {
    userCreated: [],
    failedToCreateUser: null
}, action) => {
    switch(action.type) {
        case ActionTypes.USER_CREATED:
            return {
                ...state,
                userCreated: action.payload,
                failedToCreateUser: null
            }
        case ActionTypes.FAILED_TO_CREATE_USER:
            return {
                ...state,
                userCreated: [],
                failedToCreateUser: action.payload
            }
        default:
            return state;
    }
}