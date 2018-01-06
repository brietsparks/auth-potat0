import authReducer, { defaultState } from '../src/reducer'
import { types } from '../src/actions'

describe('authReducer', () => {
  it('it returns defaultState be default', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(defaultState)
  })

  it(`sets userId on action ${types.SET_USER_ID}`, () => {
    expect(authReducer(undefined, { type: types.SET_USER_ID, payload: { userId: '1' } })).toEqual({
      userId: '1',
      authenticationAttempted: false
    })
  })

  it(`sets authenticationAttempted to true on action ${types.AUTHENTICATION_ATTEMPTED}`, () => {
    expect(authReducer(undefined, { type: types.AUTHENTICATION_ATTEMPTED })).toEqual({
      userId: undefined,
      authenticationAttempted: true
    })
  })

  it(`returns defaultState on action ${types.LOGOUT}`, () => {
    const initialState = {
      userId: '1',
      authenticationAttempted: true
    }
    expect(authReducer(initialState, { type: types.LOGOUT })).toEqual(defaultState)
  })
})
