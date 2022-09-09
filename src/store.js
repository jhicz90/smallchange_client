import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthReducer } from './reducers/AuthReducer'
import { UIReducer } from './reducers/UIReducer'
import { StoreReducer } from './reducers/StoreReducer'
import { ProductReducer } from './reducers/ProductReducer'
import { StorehouseReducer } from './reducers/StorehouseReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    ui: UIReducer,
    store: StoreReducer,
    product: ProductReducer,
    storehouse: StorehouseReducer
})

export const store = createStore(
    reducers,
    applyMiddleware(thunk)
)