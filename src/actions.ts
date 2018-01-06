import { Action } from './types'

export const types = {
  ATTEMPT_AUTHENTICATION: 'ATTEMPT_AUTHENTICATION',
  SET_USER_ID: 'SET_USER_ID',
  AUTHENTICATION_ATTEMPTED: 'AUTHENTICATION_ATTEMPTED',
  LOGOUT: 'LOGOUT'
}

export function attemptAuthentication(): Partial<Action> {
  return {
    type: types.ATTEMPT_AUTHENTICATION
  }
}

export function setUserId(userId: String): Action {
  return {
    type: types.SET_USER_ID,
    payload: { userId }
  }
}

export function authenticationAttempted(): Partial<Action> {
  return {
    type: types.AUTHENTICATION_ATTEMPTED
  }
}

export function logout(): Partial<Action> {
  return {
    type: types.LOGOUT
  }
}
