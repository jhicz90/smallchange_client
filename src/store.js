import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthReducer } from './reducers/AuthReducer'
import { UIReducer } from './reducers/UIReducer'
import { StoreReducer } from './reducers/StoreReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    ui: UIReducer,
    store: StoreReducer
})

export const store = createStore(
    reducers,
    applyMiddleware(thunk)
)