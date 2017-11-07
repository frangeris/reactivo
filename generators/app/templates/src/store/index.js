import { combineReducers } from 'redux'
import { createStore } from 'redux'

// modules
import * as session from '@store/modules/session'

const reducers = combineReducers({
  session: session.reducers
})

export default createStore(reducers)
