import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// Get all users
/*export const fetchUsers = () => (dispatch) => {
    dispatch(loading(true));

    return fetch(baseUrl + 'users')
        .then(
            response => {
                if (response.ok) {
                    return response;
                }
                // error: problem with the response iteself
                else {
                    let error = new Error(`Error ${response.status} : ${response.statusText}`);
                    error.message = response;
                    throw error;
                }
            },
            // error: server not responding
            error => {
                let error = new Error(error.message);
                throw error;   
            }
        )
        .then(response => response.json())
        .then(users => dispatch(successfullyFetchedUsers(users)))
        .catch(errmess => dispatch(failedToFetchUsers(errmess)));
}

export const successfullyFetchedUsers = (users) => ({
    type: ActionTypes.SUCCESSFULLY_FETCHED_USERS,
    payload: users
});
*/


// Create user
export const createUser = (userInformation) => (dispatch => {
    dispatch(loading(true));

    return fetch(baseUrl + 'createUser', {
        method: 'POST',
        body: JSON.stringify(userInformation),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(user => {
        dispatch(userCreated(user.createdUser));
        dispatch(loading(false));
    })
    .catch(errmess => {
        dispatch(failedToCreateUser(errmess));
        dispatch(loading(false));
    });
});


export const userCreated = (user) => ({
    type: ActionTypes.USER_CREATED,
    payload: user
});

export const failedToCreateUser = (errmess) => ({
    type: ActionTypes.FAILED_TO_CREATE_USER,
    payload: errmess
});

// Authenticate user
export const authenticateUser = (userCredentials) => (dispatch) => {
    dispatch(loading(true));

    return fetch(baseUrl + 'authenticateUser', {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(user => {
        dispatch(loginSuccessfull(user));
        dispatch(loading(false));
    })
    .catch(errmess => {
        dispatch(loginFailed(errmess));
        dispatch(loading(false));
    })
}

export const loginSuccessfull = (user) => ({
    type: ActionTypes.LOGIN_SUCCESSFULL,
    payload: user
});

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

export const logoutUser = () => ({
    type:ActionTypes.LOGOUT
});


// UTIL
export const loading = (isActive) => ({
    type: ActionTypes.LOADING,
    payload: isActive
});

