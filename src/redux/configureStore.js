import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createForms } from 'react-redux-form';
import { Login } from './login';
import { Signup } from './signup';
import { InitialUserLogin, SignupUser } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Loading } from './loading';
import { JoinReport } from './joinReport';


export const ConfigureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        combineReducers({
            login: Login,
            signup: Signup,
            loading: Loading,
            joinReport: JoinReport,
            ...createForms({
                userLoginForm: InitialUserLogin,
                signupUser: SignupUser
            })
        }),
        composeEnhancers(
            applyMiddleware(thunk, logger),
        )
    );

    return store;
}