import { createStore, combineReducers } from 'redux';
import { createForms } from 'react-redux-form'; 
import { USERS } from '../shared/users';
import { InitialUserLogin } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: USERS,
            ...createForms({
                userLogin: InitialUserLogin
            })
        })
    );

    return store;
}