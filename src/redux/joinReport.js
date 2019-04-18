import * as ActionTypes from './ActionTypes';

export const JoinReport = (state = {
    report: [],
    failedToReceiveReport: null
}, action) => {
    switch(action.type) {
        case ActionTypes.RECEIVED_JOIN_REPORT:
            return {
                ...state,
                report: action.payload,
                failedToReceiveReport: null
            }
        
        case ActionTypes.FAILED_TO_RECEIVE_JOIN_REPORT:
            return {
                ...state,
                report: [],
                failedToReceiveReport: action.payload
            }

        default:
            return state
    }
}