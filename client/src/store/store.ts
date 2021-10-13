
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState: any = {};

const middleware = [thunk];


export type RootStore = ReturnType<typeof rootReducer>

const store =  createStore(
    rootReducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))    
);
export default store;