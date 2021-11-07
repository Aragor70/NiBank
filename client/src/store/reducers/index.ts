import { combineReducers } from 'redux';


import alert from './alert';
import auth from './auth';
import users from './users';
import tsx from './tsx';
import account from './account';

const rootReducer = combineReducers({
    alert,
    auth,
    users,
    tsx,
    account
})

export default rootReducer;