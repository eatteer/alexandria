import { combineReducers, createStore } from "redux"


import { userReducer } from './user/reducer'
import { shoppingCartReducer } from './shopping-cart/reducer'

export const reducer = combineReducers({ user: userReducer, shoppingCart: shoppingCartReducer })

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())