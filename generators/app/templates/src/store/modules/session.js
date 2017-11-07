import * as types from '@store/reducers-types'

let state = {}
const reducers = (prev = state, payload) => {
  switch (payload.type) {
  case types.SET:
    return Object.assign(prev, payload)
    case types.UNSET:
    return prev.filter(element => element !== payload._name);
  default:
    return prev
  }
}

export {
  state,
  reducers
}
