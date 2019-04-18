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
    console.log(userInformation + 'hhhhhhhhhhhhooooowwddddyyyyy');

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

// Join Report
export const joinReport = (startDate, endDate, groupBy, token) => (dispatch) => {

    let bearer = 'Bearer' + token;

    return fetch(baseUrl + 'joinReport', {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(startDate, endDate, groupBy),
        headers: {
            'Authorization': bearer,
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => dispatch(receivedJoinReport(result)))
    .catch(err => dispatch(failedToReceiveJoinReport(err)));
}

export const receivedJoinReport = (report) => ({
    type: ActionTypes.RECEIVED_JOIN_REPORT,
    payload: report
})

export const failedToReceiveJoinReport = (errmess) => ({
    type: ActionTypes.FAILED_TO_RECEIVE_JOIN_REPORT,
    payload: errmess
})

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
    .then(x => {
        localStorage.setItem('token', JSON.stringify(x.token));

        dispatch(loginSuccessfull());
        dispatch(loading(false));
    })
    .catch(errmess => {
        dispatch(loginFailed(errmess));
        dispatch(loading(false));
    });
}

export const loginSuccessfull = () => ({
    type: ActionTypes.LOGIN_SUCCESSFULL
})

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});


// UTIL
export const loading = (isActive) => ({
    type: ActionTypes.LOADING,
    payload: isActive
});

