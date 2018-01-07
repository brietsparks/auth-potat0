import { AuthState, AuthReducer, Action } from './types'
import { types as actionTypes } from './actions'

export const defaultState: AuthState = {
  userId: undefined,
  authenticationAttempted: false
}

export const authReducer: AuthReducer = (
  state: AuthState = defaultState,
  { type, payload }: Action
) => {
  switch (type) {
    case actionTypes.SET_USER_ID:
      return Object.assign({}, state, { userId: payload.userId })
    case actionTypes.AUTHENTICATION_ATTEMPTED:
      return Object.assign({}, state, { authenticationAttempted: true })
    case actionTypes.LOGOUT:
      return Object.assign({}, state, { userId: undefined, authenticationAttempted: true })
    default:
      return state
  }
}

export default authReducer
