import {
  attemptAuthentication,
  setUserId,
  authenticationAttempted,
  logout,
  types
} from '../src/actions'

describe('attemptAuthentication', () => {
  it(`returns an action of type ${types.ATTEMPT_AUTHENTICATION}`, () => {
    expect(attemptAuthentication()).toEqual({
      type: types.ATTEMPT_AUTHENTICATION
    })
  })
})

describe('setUserId', () => {
  it(`returns an action of type ${types.SET_USER_ID}`, () => {
    expect(setUserId('1').type).toEqual(types.SET_USER_ID)
  })

  it(`returns an action with userId payload`, () => {
    expect(setUserId('1').payload).toEqual({ userId: '1' })
  })
})

describe('authenticationAttempted', () => {
  it(`returns an action of type ${types.AUTHENTICATION_ATTEMPTED}`, () => {
    expect(authenticationAttempted()).toEqual({
      type: types.AUTHENTICATION_ATTEMPTED
    })
  })
})

describe('logout', () => {
  it(`returns an action of type ${types.LOGOUT}`, () => {
    expect(logout()).toEqual({
      type: types.LOGOUT
    })
  })
})
