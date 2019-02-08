import * as ActionTypes from './ActionTypes';

export const Login = (state = {
    processingAuthentication: true,
    loginFailed: null,
    loggedUser: []
}, action) => {
    console.log(`in Login actions ${state.processingAuthentication}`);
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESSFULL:
            return {
                ...state,
                processingAuthentication: false,
                loginFailed: null,
                loggedUser: action.payload
            }
        case ActionTypes.PROCESSING_AUTHENTICATION:
            return {
                ...state,
                processingAuthentication: true,
                loginFailed: null,
                loggedUser: []
            }
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                processingAuthentication: false,
                loginFailed: action.payload,
                loggedUser: []
            }
        default:
            return state;
    }
}