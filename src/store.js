import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthReducer } from './reducers/AuthReducer'
import { UIReducer } from './reducers/UIReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    ui: UIReducer
})

export const store = createStore(
    reducers,
    applyMiddleware(thunk)
)