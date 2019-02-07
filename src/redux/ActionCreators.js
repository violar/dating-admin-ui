import * as ActionTypes from './ActionTypes';
import { baseUrl } from './shared/baseUrl';

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


// Authenticate user

export const authenticateUser = (userCredentials) => (dispatch) => {
    dispatch(processingAuthentication(true));

    return fetch(baseUrl + 'users', {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(user => dispatch(loginSuccessfull(user)))
    .catch(errmess => dispatch(loginFailed(errmess)))
}

export const loginSuccessfull = (user) => ({
    type: ActionTypes.LOGIN_SUCCESSFULL,
    payload: user
});

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

export const processingAuthentication = () => ({
    type: ActionTypes.PROCESSING_AUTHENTICATION
});

