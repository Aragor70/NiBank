import { combineReducers } from 'redux';


import alert from './alert';
import auth from './auth';
import users from './users';
import tsx from './tsx';
import account from './account';
import project from './project';

const rootReducer = combineReducers({
    alert,
    auth,
    users,
    tsx,
    account,
    project
})

export default rootReducer;