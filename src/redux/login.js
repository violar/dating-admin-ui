import * as ActionTypes from './ActionTypes';

export const Login = (state = {
    processingAuthentication: true,
    loginFailed: null,
    loginSuccessfull: []
}, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESSFULL:
            return {
                ...state,
                processingAuthentication: false,
                loginFailed: null,
                loginSuccessfull: action.payload
            }
        case ActionTypes.PROCESSING_AUTHENTICATION:
            return {
                ...state,
                processingAuthentication: true,
                loginFailed: null,
                loginSuccessfull: []
            }
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                processingAuthentication: false,
                loginFailed: action.payload,
                loginSuccessfull: []
            }
        default:
            return state;
    }
}