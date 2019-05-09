import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


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

// Join Report
export const joinReport = (startDate, endDate, groupBy, token) => (dispatch) => {
    dispatch(loading(true));

    let tok = 'Bearer ' + token;
    return fetch(baseUrl + 'joinReport', {
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate,
            groupBy
        }),
        headers: {
            'Authorization': tok,
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(result => {
        dispatch(receivedJoinReport(result));
        dispatch(loading(false));
    })
    .catch(err => {
        dispatch(failedToReceiveJoinReport(err));
        dispatch(loading(false));
    });
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

