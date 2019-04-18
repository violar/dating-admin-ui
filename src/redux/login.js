import * as ActionTypes from './ActionTypes';

export const Login = (state = {
    loginFailed: null
}, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESSFULL:
            return {
                ...state,
                loginFailed: null
            }
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                loginFailed: action.payload
            }
        default:
            return state;
    }
}