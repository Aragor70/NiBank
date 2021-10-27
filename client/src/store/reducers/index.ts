import { combineReducers } from 'redux';


import alert from './alert';
import auth from './auth';
import users from './users';

const rootReducer = combineReducers({
    alert,
    auth,
    users
})

export default rootReducer;