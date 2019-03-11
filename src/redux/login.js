import * as ActionTypes from './ActionTypes';

export const Login = (state = {
    loginFailed: null,
    loggedUser: []
}, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESSFULL:
            return {
                ...state,
                loginFailed: null,
                loggedUser: action.payload
            }
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                loginFailed: action.payload,
                loggedUser: []
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                loginFailed: null,
                loggedUser: []
            }
        default:
            return state;
    }
}