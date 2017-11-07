import store from '@store'
import * as types from '@store/reduces-types'

const set = (_name, payload) => {
  let value = store.state.session[_name] || {}

  return Object.assign({}, value, payload, { type: types.SET, _name })
}

const unset = (_name) => {
  return Object.assign({}, { type: types.UNSET, _name })
}

export {
  set,
  unset,
}
