import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Login } from './login';
import { InitialUserLogin } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            login: Login,
            ...createForms({
                userLoginForm: InitialUserLogin
            })
        }),
        applyMiddleware(thunk, logger)
    );

    

    return store;
}