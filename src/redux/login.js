import * as ActionTypes from './ActionTypes';

export const Login = (state = {
    loginFailed: null,
    user: null
}, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESSFULL:
            return {
                ...state,
                loginFailed: null,
                user: action.payload
            }
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                loginFailed: action.payload,
                user: null
            }
        default:
            return state;
    }
}