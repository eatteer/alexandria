import { combineReducers, createStore } from "redux"

/* Reducers */
import { userReducer } from './user'
import { shoppingCartReducer } from './shopping-cart'

export const reducer = combineReducers({ user: userReducer, shoppingCart: shoppingCartReducer })

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())