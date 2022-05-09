import { combineReducers, createStore } from "redux"

/* Reducers */
import { user } from './user'
import { shoppingCart } from './shopping-cart'

export const reducer = combineReducers({ user, shoppingCart })

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())