import { combineReducers, createStore } from "redux"
import { user } from './user'
import { purchase } from './purchase'



export const reducer = combineReducers({ user, purchase })

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())