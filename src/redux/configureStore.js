import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Login } from './login';
import { Signup } from './signup';
import { InitialUserLogin, SignupUser } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Loading } from './loading';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            login: Login,
            signup: Signup,
            loading: Loading,
            ...createForms({
                userLoginForm: InitialUserLogin,
                signupUser: SignupUser
            })
        }),
        applyMiddleware(thunk, logger)
    );

    

    return store;
}